import React from "react";
import ReactDOM from "react-dom";
// index.css
import "./index.css";
// router
import { BrowserRouter as Router } from "react-router-dom";
// app
import App from "./App";
// footer
import Footer from "./components/Footer";

ReactDOM.render(
  <Router style={{ width: "100vw", height: "100vh" }}>
    <App />
    <Footer />
  </Router>,
  document.getElementById("root")
);
