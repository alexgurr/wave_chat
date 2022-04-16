import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Box, TextField } from "@material-ui/core";
import { Socket } from "socket.io-client";
import "./_message-input.scss";

interface IMessageInputProps {
  socket: null | Socket;
}

const MessageInput = ({ socket }: IMessageInputProps) => {
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
    <Box className="input-container">
      <TextField
        className="input-container__text-input"
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
        className="input-container__button"
        onClick={handleSubmit}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
