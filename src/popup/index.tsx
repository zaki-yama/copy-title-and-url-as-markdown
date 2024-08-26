import React from "react";
import ReactDOM from "react-dom/client";
import { Popup } from "./Popup";
import { escapeBrackets, copyToClipboard } from "../util";
import { DEFAULT_FORMAT } from "../constant";

const queryInfo = {
  active: true,
  currentWindow: true,
};

chrome.tabs.query(queryInfo, function (tabs) {
  chrome.storage.local.get({ format: DEFAULT_FORMAT }, function (options) {
    const tab = tabs[0];
    const title = tab.title || "";
    const url = tab.url || "";
    let host = "";

    const elms = url.split('/');
    if (elms.length > 2) {
      host = elms[2];
    }
    copyToClipboard(options.format, title, escapeBrackets(url), host);

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <Popup title={title} url={escapeBrackets(url)} />
      </React.StrictMode>
    );
  });
});
