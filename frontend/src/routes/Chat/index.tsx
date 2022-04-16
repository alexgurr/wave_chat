import { useState, useEffect, useRef, RefObject } from "react";
import { Container, CssBaseline, Box } from "@material-ui/core";
import { useSocketConnection } from "./hooks";
import { MessageInput, MessagesList } from "./components";
import "./_index.scss";

import { IMessage } from "./models";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const listScrollRef = useRef(null);

  const onMessageReceived = (message: IMessage) => {
    setMessages((prevState) => [...prevState, message]);
  };

  const { socket } = useSocketConnection({ onMessageReceived });

  useEffect(() => {
    if (listScrollRef.current) {
      (listScrollRef as RefObject<HTMLElement>).current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [messages]);

  return (
    <Container component="main" maxWidth="md" className="chat-layout">
      <CssBaseline />
      <Box className="chat-layout__body">
        <MessagesList messages={messages} listScrollRef={listScrollRef} />
        <MessageInput socket={socket} />
      </Box>
    </Container>
  );
};

export default Chat;
