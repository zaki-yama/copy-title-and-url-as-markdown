import React from "react";
import ReactDOM from "react-dom";
import { Popup } from "./Popup";
import { escapeBrackets } from "../util";

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
        const url = escapeBrackets(tab.url);

        const dummyEl = document.getElementById(
          "copied"
        ) as HTMLTextAreaElement;

        dummyEl.value = options.format
          .replace("${title}", tab.title)
          .replace("${url}", url);
        dummyEl.select();
        document.execCommand("copy");

        ReactDOM.render(
          <Popup title={tab.title} url={url} />,
          document.getElementById("popup")
        );
      }
    );
  });
});
