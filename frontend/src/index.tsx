import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { StylesProvider } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";
import "./_index.scss";

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
