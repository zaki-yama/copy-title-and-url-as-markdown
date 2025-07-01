import React from "react";
import ReactDOM from "react-dom/client";
import { Options } from "../../src/options/Options";

function initializeOptions() {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <Options />
      </React.StrictMode>
    );
  }
}

// Only initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeOptions);
} else {
  initializeOptions();
}
