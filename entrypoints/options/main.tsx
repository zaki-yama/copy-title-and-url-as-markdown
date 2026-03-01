import "../../src/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Options } from "../../src/options/Options";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
