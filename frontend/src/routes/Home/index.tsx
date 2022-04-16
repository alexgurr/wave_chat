import { useState } from "react";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";
import { toast } from "react-toastify";
import {
  Container,
  Button,
  CssBaseline,
  Typography,
  Box,
  TextField
} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";

import "./_index.scss";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name) {
      toast.error("Please enter a name");
    } else {
      toast.success("You have been connected successfully");
      navigate(`/chat/${shortid.generate()}`, { state: { name } });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className="home-layout">
        <ForumIcon className="home-layout__icon" />
        <Typography variant="h3">Wave Chat</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Chat Name"
          autoComplete="name"
          autoFocus
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          id="button"
          className="home-layout__button"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
