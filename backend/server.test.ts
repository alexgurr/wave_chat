import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import Client from "socket.io-client";
import { AddressInfo } from "net";

interface IMessage {
  from: string;
  text: string;
}

describe("socket connections", () => {
  let io, serverSocket, clientSocket;

  beforeEach((done) => {
    const httpServer = createServer();
    io = new IOServer(httpServer);

    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      clientSocket = Client(`http://localhost:${port}`, {
        query: { name: "Steven" }
      });
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterEach(() => {
    io.close();
    clientSocket.close();
  });

  it("should send admin message", (done) => {
    const message = {
      from: "Admin",
      text: "Welcome to Wave Chat App"
    };

    clientSocket.on("newMessage", (arg: IMessage) => {
      expect(arg).toEqual(message);
      done();
    });

    serverSocket.emit("newMessage", message);
  });

  it("should receive a message and emit it to all connected users", (done) => {
    clientSocket.emit("createMessage", {
      text: "Hello!!"
    });

    serverSocket.on("createMessage", (arg: IMessage) => {
      expect(arg).toEqual({ text: "Hello!!" });
      io.emit("newMessage", {
        from: serverSocket.handshake.query.name,
        text: arg.text
      });
    });

    clientSocket.on("newMessage", (arg: IMessage) => {
      expect(arg).toEqual({
        from: "Steven",
        text: "Hello!!"
      });
      done();
    });
  });
});
