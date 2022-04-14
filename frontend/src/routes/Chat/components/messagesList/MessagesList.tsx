import { RefObject } from "react";
import { Typography, Box } from "@material-ui/core";

import { IMessage } from "../../models";
import useCustomStyles from "./styles";

interface IMessageListProps {
  messages: IMessage[];
  listScrollRef: null | RefObject<HTMLDivElement>;
}

const MessagesList = ({ messages, listScrollRef }: IMessageListProps) => {
  const classes = useCustomStyles();
  return (
    <Box className={classes.listContainer}>
      {messages.map((item, i) => (
        <Typography className={classes.item} key={i}>
          {item.from}: {item.text}
        </Typography>
      ))}
      {/* Enable scroll to bottom for incoming messages or adding new message */}
      <div ref={listScrollRef}></div>
    </Box>
  );
};

export default MessagesList;
