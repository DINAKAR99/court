import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import React from "react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
