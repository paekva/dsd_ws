import socket, sys, time

print("To exit the server correct and close the socket hit CTRL-C")
print("and then send another message with the tcp_cli.py")

if len(sys.argv) != 2:
    print(f"Usage: python {sys.argv[0]} <port>")
    sys.exit(1)
try:
    port = int(sys.argv[1])
except:
    print(f"{sys.argv[1]} is not a valid Port number")
    sys.exit(1)
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(("", port))
    s.listen(1)
    while 1:
        conn, addr = s.accept()
        print(f"Connection to Host: {addr[0]} on port {addr[1]}")
        data = str(conn.recv(1024), "utf-8")
        print(f"received: {data}")
        time.sleep(2)
        conn.send(bytes("+++ " + data + " +++", "utf-8"))
        conn.close()
except KeyboardInterrupt:
    s.close()
    print("Exit server")
    sys.exit(0)
except:
    print("Server error")
    sys.exit(1)
