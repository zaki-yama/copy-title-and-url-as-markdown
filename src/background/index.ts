import { DEFAULT_FORMAT } from "./../constant";
import { escapeBrackets, copyToClipboard } from "../util";

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

    const key = `format${formatIndex}`;
    chrome.storage.local.get(null, async function(options) {
      const tab = tabs[0];

      // NOTE: fallback to `options.format` for backward compatibility
      copyToClipboard(options[key] || options.format || DEFAULT_FORMAT, tab);

      // chrome.browserAction.setBadgeText({ text: "bar" });

      console.log("done!");
    });
  });
});
