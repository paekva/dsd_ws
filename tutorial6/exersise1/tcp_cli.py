import socket, sys

if len(sys.argv) != 3:
    print(f"Usage: python {sys.argv[0]} <ip> <port>")
    sys.exit(1)
try:
    port = int(sys.argv[2])
except:
    print(f"{sys.argv[2]} is not a valid Port number")
    sys.exit(1)
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((sys.argv[1], port))
    s.send(bytes("Hello, world", "utf-8"))
    data = str(s.recv(1024), "utf-8")
    print(f"received: {data}")
    s.close()
except:
    print("Connection refused!")
    sys.exit(1)
