import React from "react";
import ReactDOM from "react-dom/client";
import { Popup } from "./Popup";
import { escapeBrackets, removeZeroWidthWhiteSpace, copyToClipboard } from "../util";
import { DEFAULT_FORMAT } from "../constant";

const queryInfo = {
  active: true,
  currentWindow: true,
};

chrome.tabs.query(queryInfo, function (tabs) {
  chrome.storage.local.get({ format: DEFAULT_FORMAT }, function (options) {
    const tab = tabs[0];
    const title = removeZeroWidthWhiteSpace(tab.title || "");
    const url = escapeBrackets(tab.url || "");
    copyToClipboard(options.format, title, url);

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <Popup title={title} url={url} />
      </React.StrictMode>
    );
  });
});
