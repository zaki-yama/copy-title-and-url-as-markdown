import React from "react";
import ReactDOM from "react-dom";
import { Popup } from "./Popup";

document.addEventListener("DOMContentLoaded", function() {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    chrome.storage.sync.get(
      { customFormat: "[${title}](${url})" },
      async function(options) {
        const tab = tabs[0];
        // Encode (, ), [, ]
        const url = tab.url
          .replace(/\(/g, escape)
          .replace(/\)/g, escape)
          .replace(/\[/g, escape)
          .replace(/\]/g, escape);
        await navigator.clipboard.writeText(
          options.customFormat
            .replace("${title}", tab.title)
            .replace("${url}", url)
        );

        ReactDOM.render(
          <Popup title={tab.title} url={url} />,
          document.getElementById("popup")
        );
      }
    );
  });
});
