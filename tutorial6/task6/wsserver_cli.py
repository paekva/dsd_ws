import sys
import socket
import asyncore
import wsserver

wshandlers = []


def printWshandlers():
    print()
    for i in range(0, len(wshandlers)):
        print(f"{i}: {repr(wshandlers[i])}")
    print()


class WebSocketHandler(wsserver.dispatcher):
    def __init__(self, sock=None):
        wsserver.dispatcher.__init__(self, sock=sock)
        self.type = "Handler"

    def onmessage(self, data):
        try:
            str(data, "utf-8")
        except:
            print("Skip sending - no utf-8 content")
            return
        else:
            for h in wshandlers:
                h.snd(data)

    def onclose(self):
        wshandlers.remove(self)
        print(f"Connection from {self} closed")


class WebSocketServer(wsserver.dispatcher):
    def __init__(self, addr):
        wsserver.dispatcher.__init__(self)
        self.create_socket(socket.AF_INET, socket.SOCK_STREAM)
        self.set_reuse_addr()
        self.bind(addr)
        self.listen(5)
        self.type = "Server"

    def onconnect(self):
        sock, addr = self.accept()
        print(f"New connection from {repr(addr)}")
        wshandlers.append(WebSocketHandler(sock=sock))


if len(sys.argv) != 2:
    print(f"Usage: python {sys.argv[0]} <port>")
    sys.exit(1)
try:
    port = int(sys.argv[1])
except:
    print(f"{sys.argv[1]} is not a valid Port number")
    sys.exit(1)

if port < 1 or port > 65535:
    print("The Port number had to be between 1 and 65535")
    sys.exit(1)

print("To exit the websocketserver hit CTRL-C and wait up to 30 sec")

try:
    WebSocketServer(("", port))
    asyncore.loop(use_poll=True)
except KeyboardInterrupt:
    print("Exit server")