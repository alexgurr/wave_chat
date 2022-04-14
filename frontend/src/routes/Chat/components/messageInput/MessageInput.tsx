import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Box, TextField } from "@material-ui/core";
import { Socket } from "socket.io-client";
import useCustomStyles from "./styles";

interface IMessageInputProps {
  socket: null | Socket;
}

const MessageInput = ({ socket }: IMessageInputProps) => {
  const classes = useCustomStyles();
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message) {
      toast.error("Please enter a message");
    } else {
      socket?.emit("createMessage", {
        text: message
      });

      setMessage("");
    }
  };

  return (
    <Box className={classes.inputContainer}>
      <TextField
        className={classes.textInput}
        multiline
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="text"
        label="Message"
        autoComplete="text"
        autoFocus
        size="small"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
