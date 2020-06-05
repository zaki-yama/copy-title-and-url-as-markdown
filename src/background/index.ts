import { escapeBrackets, copyToClipboard } from "../util";

chrome.commands.onCommand.addListener(command => {
  console.log("Command:", command);

  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    chrome.storage.local.get({ format: "[${title}](${url})" }, async function(
      options
    ) {
      const tab = tabs[0];
      copyToClipboard(options.format, tab);
      // chrome.browserAction.setBadgeText({ text: "bar" });

      console.log("done!");
    });
  });
});
