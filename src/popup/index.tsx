import React from "react";
import ReactDOM from "react-dom";
import { Popup } from "./Popup";
import { escapeBrackets, copyToClipboard } from "../util";
import { DEFAULT_FORMAT } from "../constant";

document.addEventListener("DOMContentLoaded", function () {
  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    chrome.storage.local.get({ format: DEFAULT_FORMAT }, function (options) {
      const tab = tabs[0];
      copyToClipboard(options.format, tab);

      ReactDOM.render(
        <Popup title={tab.title} url={escapeBrackets(tab.url)} />,
        document.getElementById("popup")
      );
    });
  });
});
