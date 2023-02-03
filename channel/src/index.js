import React from "react";
import ReactDOM from "react-dom/client";
import "../src/index_.css";
import App from "./layouts/App_";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
