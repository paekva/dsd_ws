import asyncore
import asynchat
import hashlib, base64  # for websocket handshake
import struct
import os
import itertools

OPCODE_CONTINUATION_FRAME = 0x0
OPCODE_TEXT_FRAME = 0x1
OPCODE_BINARY_FRAME = 0x2
OPCODE_CONNECTION_CLOSE = 0x8
OPCODE_PING = 0x9
OPCODE_PONG = 0xA

READYSTATE_CONNECTING = 0
READYSTATE_OPEN = 1
READYSTATE_CLOSING = 2
READYSTATE_CLOSED = 3

# byte 0
FRAME_FIN_MASK = 128
FRAME_RSV1_MASK = 64
FRAME_RSV2_MASK = 32
FRAME_RSV3_MASK = 16
FRAME_OPCODE_MASK = 15

# byte 1
FRAME_MASKED_MASK = 1
FRAME_PAYLOAD_LENGTH_MASK = 127


def xor_crypt_bytes(data, key):
    return bytes([x ^ y for (x, y) in zip(data, itertools.cycle(key))])


def calculate_handshake_key(key):
    # sha1_hash(Sec-Websocket-Key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    sha1_hash = hashlib.sha1((key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").encode()).digest()
    # encode sha1_hash with base64
    b64_string = str(base64.b64encode(sha1_hash), "utf-8")
    return b64_string


class dispatcher(asynchat.async_chat):
    def __init__(self, sock=None):
        asynchat.async_chat.__init__(self, sock=sock)
        # self.ac_in_buffer_size = 1024*1024*1
        # self.ac_out_buffer_size = 1024*1024*1
        self.set_terminator("\r\n\r\n".encode())
        self.__FRAME_PAYLOAD = b""
        self.readyState = READYSTATE_CONNECTING
        self.statusCode = None
        self.statusText = None
        self.version = None
        self.__recvhead = False
        self.__serverInitiatedClosure = False

    def handle_read(self):
        if self.__recvhead:

            byte = ord(self.recv(1))
            self.__FRAME_FIN = (byte & 128) >> 7
            self.__FRAME_RSV1 = (byte & 64) >> 6
            self.__FRAME_RSV2 = (byte & 32) >> 5
            self.__FRAME_RSV3 = (byte & 16) >> 4
            self.__FRAME_OPCODE = byte & 15

            byte = ord(self.recv(1))
            self.__FRAME_MASKED = (byte & 128) >> 7
            self.__FRAME_PAYLOAD_LENGTH = byte & 127

            if self.__FRAME_PAYLOAD_LENGTH == 126:
                self.__FRAME_PAYLOAD_LENGTH = struct.unpack(">H", self.recv(2))[0]

            if self.__FRAME_PAYLOAD_LENGTH == 127:
                self.__FRAME_PAYLOAD_LENGTH = struct.unpack(">Q", self.recv(8))[0]

            # print debug info
            print(f"IN: frame-fin={self.__FRAME_FIN}, frame-opcode={self.__FRAME_OPCODE}, frame-payload-length={self.__FRAME_PAYLOAD_LENGTH}, frame-masked={self.__FRAME_MASKED}")

            if (self.__FRAME_OPCODE == OPCODE_CONNECTION_CLOSE and self.readyState == READYSTATE_OPEN):
                self.readyState = READYSTATE_CLOSED
                self.statusCode = struct.unpack(">H", self.recv(2))[0]
                # self.statusText = self.__FRAME_PAYLOAD[2:]
                self.__FRAME_PAYLOAD = b""
                self.__send_frame(FRAME_OPCODE=OPCODE_CONNECTION_CLOSE)
                self.onclose()
                asynchat.async_chat.close(self)
                return
                # masking key is not sent when connection is closing
                # self.__FRAME_MASKED = False

            if (self.__FRAME_OPCODE == OPCODE_CONNECTION_CLOSE and self.readyState == READYSTATE_CLOSING):
                self.readyState = READYSTATE_CLOSED
                self.statusCode = struct.unpack(">H", self.recv(2))[0]
                self.__FRAME_PAYLOAD = b""
                self.onclose()
                asynchat.async_chat.close(self)
                return

            if self.__FRAME_OPCODE == OPCODE_PING:
                # flush
                self.recv(8192)
                self.onping()
                return

            if self.__FRAME_OPCODE == OPCODE_PONG:
                # flush
                self.recv(8192)
                self.onpong()
                return

            if self.__FRAME_MASKED:
                self.__FRAME_MASKING_KEY = self.recv(4)

            if self.__FRAME_PAYLOAD_LENGTH == 0:
                print("Skipping - no content")
                return

            self.set_terminator(self.__FRAME_PAYLOAD_LENGTH)
            self.__recvhead = False

        asynchat.async_chat.handle_read(self)

    def handle_accept(self):
        self.onconnect()

    def handle_error(self):
        asyncore.dispatcher.close(self)
        self.readyState = READYSTATE_CLOSED
        self.statusCode = None
        self.onclose()

    def handle_close(self):
        asyncore.dispatcher.close(self)
        self.readyState = READYSTATE_CLOSED
        self.statusCode = None
        self.onclose()

    def collect_incoming_data(self, data):
        self.__FRAME_PAYLOAD += data

    def found_terminator(self):
        if self.readyState == READYSTATE_CONNECTING:
            self.readystate_connecting()
            return
        if self.readyState == READYSTATE_OPEN:
            self.readystate_open()
            return
        if self.readyState == READYSTATE_CLOSING:
            self.readystate_closing()
            return

        self.__recvhead = True
        self.__FRAME_PAYLOAD = b""
        self.set_terminator(None)

    def readystate_connecting(self):
        try:
            self.head = str(self.__FRAME_PAYLOAD, "utf-8").split("\r\n")
            self.method, self.path, self.version = self.head[0].split()
            self.query = ""
            if self.path.find("?") > -1:
                (self.path, self.query) = self.path.split("?", 1)
            # Request Headers
            self.__requestheader = {}
            for i in range(1, len(self.head)):
                option, value = self.head[i].split(": ", 1)
                self.__requestheader[option] = value
            # cookies
            self.__cookies = {}
            if self.getRequestHeader("Cookie"):
                cookies = self.getRequestHeader("Cookie")
                for cookie in cookies.split("; "):
                    option, value = cookie.split("=")
                    self.__cookies[option] = value
            # check content length
            if self.method == "POST":
                int(self.getRequestHeader("Content-Length"))

            # many times used variables
            # filepath, filename = os.path.split(self.path)
            # shortname, self.extension = os.path.splitext(filename)

            if self.method != "GET" or self.getRequestHeader("Upgrade") != "websocket":
                raise TypeError()

        except:
            self.push("HTTP/1.1 400 Bad Request\r\n".encode())
            self.push("Content-Type: text/plain\r\n".encode())
            self.push("Content-Length: 0\r\n".encode())
            self.push("\r\n".encode())
        else:
            self.push("HTTP/1.1 101 Switching Protocols\r\n".encode())
            self.push("Upgrade: WebSocket\r\n".encode())
            self.push("Connection: Upgrade\r\n".encode())
            self.push("Access-Control-Allow-Origin: *\r\n".encode())
            # self.push(f"Sec-WebSocket-Origin: {self.getRequestHeader('Sec-WebSocket-Origin')}\r\n".encode()) #address of client
            # self.push(f"Sec-WebSocket-Location: ws://{self.getRequestHeader('Host')}{self.path}\r\n".encode()) #address of web socket
            # self.push('Sec-WebSocket-Protocol: sample\r\n'.encode())
            self.push(f"Sec-WebSocket-Accept: {calculate_handshake_key(self.getRequestHeader('Sec-WebSocket-Key'))}\r\n".encode())
            self.push("\r\n".encode())

            self.readyState = READYSTATE_OPEN
            self.__recvhead = True
            self.__FRAME_PAYLOAD = b""
            self.set_terminator(None)

    def readystate_open(self):
        self.onmessage(
            xor_crypt_bytes(self.__FRAME_PAYLOAD, self.__FRAME_MASKING_KEY)
            if self.__FRAME_MASKED
            else self.__FRAME_PAYLOAD
        )

        self.set_terminator(None)
        self.__recvhead = True

        self.__FRAME_PAYLOAD = b""

    def readystate_closing(self):
        self.statusCode = struct.unpack(">H", self.__FRAME_PAYLOAD[:2])[0]
        self.statusText = self.__FRAME_PAYLOAD[2:]
        self.__FRAME_PAYLOAD = b""
        self.onclose()

    def __send_frame(self, FRAME_FIN=True, FRAME_RSV1=False, FRAME_RSV2=False, FRAME_RSV3=False, FRAME_OPCODE=None, FRAME_MASKED=False, FRAME_PAYLOAD=b"", FRAME_STATUS_CODE=1000):
        data = b""

        data += (((FRAME_FIN & True) << 7) | ((FRAME_RSV1 & True) << 6) | ((FRAME_RSV2 & True) << 5) | ((FRAME_RSV3 & True) << 4) | FRAME_OPCODE).to_bytes(1, byteorder="big")

        if FRAME_OPCODE == OPCODE_CONNECTION_CLOSE:
            FRAME_PAYLOAD = struct.pack(">H", FRAME_STATUS_CODE)
            FRAME_MASKED = False

        FRAME_PAYLOAD_LENGTH = len(FRAME_PAYLOAD)

        data += (((FRAME_MASKED & True) << 7) | (127 if len(FRAME_PAYLOAD) > 65535 else (126 if len(FRAME_PAYLOAD) > 125 else len(FRAME_PAYLOAD)))).to_bytes(1, byteorder="big")

        if len(FRAME_PAYLOAD) > 65535:
            data += struct.pack(">Q", len(FRAME_PAYLOAD))
        elif len(FRAME_PAYLOAD) > 125:
            data += struct.pack(">H", len(FRAME_PAYLOAD))

        if FRAME_MASKED:
            FRAME_MASKING_KEY = os.urandom(4)
            data += FRAME_MASKING_KEY

        if len(FRAME_PAYLOAD):
            data += (xor_crypt_bytes(FRAME_PAYLOAD, FRAME_MASKING_KEY) if FRAME_MASKED else FRAME_PAYLOAD)

        self.push(data)

        # print debug info
        print(f"OUT: frame-fin={FRAME_FIN}, frame-opcode={FRAME_OPCODE}, frame-payload-length={FRAME_PAYLOAD_LENGTH}, frame-masked={FRAME_MASKED}")

    def snd(self, data):
        if self.readyState == READYSTATE_OPEN:
            self.__send_frame(FRAME_OPCODE=OPCODE_TEXT_FRAME, FRAME_PAYLOAD=data)
        else:
            raise IOError()

    def close(self, statusCode=1000):
        if self.readyState == READYSTATE_OPEN:
            self.__send_frame(FRAME_OPCODE=OPCODE_CONNECTION_CLOSE)
            self.readyState = READYSTATE_CLOSING

    def ping(self):
        if self.readyState == READYSTATE_OPEN:
            self.__send_frame(FRAME_OPCODE=OPCODE_PING)
        else:
            raise IOError()

    def pong(self):
        if self.readyState == READYSTATE_OPEN:
            self.__send_frame(FRAME_OPCODE=OPCODE_PONG)
        else:
            raise IOError()

    def onping(self):
        if self.readyState == READYSTATE_OPEN:
            self.pong()

    def onpong(self):
        pass

    def getRequestHeader(self, option):
        if option in self.__requestheader:
            return self.__requestheader[option]
        else:
            return None

    def getCookie(self, option):
        if option in self.__cookies:
            return self.__cookies[option]
        else:
            return None

    def __str__(self):
        status = f"WebSocket{self.type} "
        if self.accepting and self.addr:
            status += "listening at localhost"
        elif self.connected:
            status += "connected at "
        if self.addr is not None:
            try:
                status += "%s:%d" % self.addr
            except TypeError:
                status += repr(self.addr)
        return f"<{status}>"
