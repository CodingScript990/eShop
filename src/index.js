import React from "react";
import ReactDOM from "react-dom";
// index.css
import "./index.css";
// router
import { BrowserRouter as Router } from "react-router-dom";
// app
import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
