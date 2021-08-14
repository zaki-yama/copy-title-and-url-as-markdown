import React from "react";
import ReactDOM from "react-dom";
import { Popup } from "./Popup";
import { escapeBrackets, copyToClipboard } from "../util";
import { OptionsType } from "../options/Options";
import { formats, Format } from "../constant";

document.addEventListener("DOMContentLoaded", function () {
  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    /*
     * @param {OptionsType} the option list you wanna get, the value is the
     * default value
     */
    chrome.storage.local.get(
      { selected_format: formats[0], formats: formats } as OptionsType,
      (options) => {
        // TypeScript Assertion
        const opts = options as OptionsType;
        const tab = tabs[0];
        copyToClipboard(opts.selected_format.template, tab);

        ReactDOM.render(
          <Popup
            title={tab.title}
            url={escapeBrackets(tab.url)}
            formats={opts.formats}
            selected_format={opts.selected_format}
          />,
          document.getElementById("popup")
        );
      }
    );
  });
});
