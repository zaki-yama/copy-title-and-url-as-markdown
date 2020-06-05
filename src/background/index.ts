import { escapeBrackets } from "../util";

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
      const url = escapeBrackets(tab.url);
      const el = document.getElementById("dummy") as HTMLTextAreaElement;
      el.value = options.format
        .replace("${title}", tab.title)
        .replace("${url}", url);
      el.select();
      document.execCommand("copy");
      // chrome.browserAction.setBadgeText({ text: "bar" });

      console.log("done!");
    });
  });
});
