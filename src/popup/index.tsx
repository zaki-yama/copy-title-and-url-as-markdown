import React from "react";
import ReactDOM from "react-dom";
import { Popup } from "./Popup";

document.addEventListener("DOMContentLoaded", function() {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    const tab = tabs[0];
    const obj = document.getElementById("copied") as HTMLTextAreaElement;
    chrome.storage.sync.get({ customFormat: "[${title}](${url})" }, function(
      options
    ) {
      // Encode (, ), [, ]
      const url = tab.url
        .replace(/\(/g, escape)
        .replace(/\)/g, escape)
        .replace(/\[/g, escape)
        .replace(/\]/g, escape);
      obj.value = options.customFormat
        .replace("${title}", tab.title)
        .replace("${url}", url);
      obj.select();
      document.execCommand("copy");

      ReactDOM.render(
        <Popup title={tab.title} url={url} />,
        document.getElementById("popup")
      );
    });
  });
});
