import { RefObject } from "react";
import { Typography, Box } from "@material-ui/core";

import { IMessage } from "../../models";
import "./_messages-list.scss";

interface IMessageListProps {
  messages: IMessage[];
  listScrollRef: null | RefObject<HTMLDivElement>;
}

const MessagesList = ({ messages, listScrollRef }: IMessageListProps) => {
  return (
    <Box className="list-container">
      {messages.map((item, i) => (
        <Typography className="list-container__item" key={i}>
          {item.from}: {item.text}
        </Typography>
      ))}
      {/* Enable scroll to bottom for incoming messages or adding new message */}
      <div ref={listScrollRef}></div>
    </Box>
  );
};

export default MessagesList;
