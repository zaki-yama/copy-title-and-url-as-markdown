import { DEFAULT_FORMAT } from "./../constant";
import { escapeBrackets, copyToClipboard } from "../util";
import { OptionsType } from "../options/Options";

chrome.commands.onCommand.addListener(command => {
  console.log("Command:", command);

  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // All commands are like `copy_as_format_*` (*: 1 or 2 or 3)
    const formatIndex = command.slice(-1);
    console.log("format: ", formatIndex);

    const key = `optionalFormat${formatIndex}`;
    chrome.storage.local.get(null, function(options: OptionsType) {
      const tab = tabs[0];

      copyToClipboard(options[key], tab);

      chrome.browserAction.setBadgeText({ text: formatIndex });
      setTimeout(() => {
        chrome.browserAction.setBadgeText({ text: "" });
      }, 1000);

      console.log("done!");
    });
  });
});
