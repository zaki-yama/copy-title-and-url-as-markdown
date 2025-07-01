import React from "react";
import ReactDOM from "react-dom/client";
import { Popup } from "../../src/popup/Popup";
import { escapeBrackets, copyToClipboard } from "../../src/util";
import { DEFAULT_FORMAT } from "../../src/constant";

function initializePopup() {
  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    chrome.storage.local.get({ format: DEFAULT_FORMAT }, function (options) {
      const tab = tabs[0];
      const title = tab.title || "";
      const url = tab.url || "";
      copyToClipboard(options.format, title, escapeBrackets(url));

      const rootElement = document.getElementById("root");
      if (rootElement) {
        ReactDOM.createRoot(rootElement).render(
          <React.StrictMode>
            <Popup title={title} url={escapeBrackets(url)} />
          </React.StrictMode>
        );
      }
    });
  });
}

// Only initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePopup);
} else {
  initializePopup();
}
