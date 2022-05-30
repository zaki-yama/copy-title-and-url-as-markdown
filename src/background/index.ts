import { DEFAULT_FORMAT } from "./../constant";
import { escapeBrackets, copyToClipboard } from "../util";
import { OptionsType } from "../options/Options";

chrome.commands.onCommand.addListener((command) => {
  console.log("Command:", command);

  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    // All commands are like `copy_as_format_*` (*: 1 or 2 or 3)
    const formatIndex = command.slice(-1);
    console.log("format: ", formatIndex);

    const key = `optionalFormat${formatIndex}`;
    chrome.storage.local.get(null, function (options: OptionsType) {
      const tab = tabs[0];
      console.log(tab.url, tab.title);
      console.log(options);

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: copyToClipboard,
        args: [options[key], tab.title, escapeBrackets(tab.url)],
      });

      chrome.action.setBadgeText({ text: formatIndex });
      setTimeout(() => {
        chrome.action.setBadgeText({ text: "" });
      }, 1000);

      console.log("done!");
    });
  });
});
