import React from "react";
import ReactDOM from "react-dom";
import { Popup } from "./Popup";
import { escapeBrackets, copyToClipboard } from "../util";

document.addEventListener("DOMContentLoaded", function () {
  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    chrome.storage.local.get(
      { format: "[${title}](${url})" },
      async function (options) {
        const tab = tabs[0];
        copyToClipboard(options.format, tab);

        ReactDOM.render(
          <Popup title={tab.title} url={escapeBrackets(tab.url)} />,
          document.getElementById("popup")
        );
      }
    );
  });
});
