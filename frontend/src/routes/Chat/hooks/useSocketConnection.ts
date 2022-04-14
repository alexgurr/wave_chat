import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import config from "../../../config";
import { ILocationState, IMessage } from "../models";

interface IUseSocketConnectionProps {
  onMessageReceived: (message: IMessage) => void;
}

const useSocketConnection = ({
  onMessageReceived
}: IUseSocketConnectionProps) => {
  const location = useLocation();
  const name = (location.state as ILocationState).name;
  const [socket, setSocket] = useState<null | Socket>(null);

  useEffect(() => {
    // Connecting the socket to server
    const socket = io(config.SOCKET_ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
      // Assigning the chat name with the socket connection
      query: { name }
    });

    setSocket(socket);

    socket.on("newMessage", (message) => {
      onMessageReceived(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    socket
  };
};

export default useSocketConnection;
