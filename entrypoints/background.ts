import { INITIAL_OPTION_VALUES } from "../src/constant";
import type { OptionsType } from "../src/options/Options";
import { escapeBrackets, copyToClipboard } from "../src/util";

export default defineBackground(() => {
  browser.commands.onCommand.addListener(async (command, tab) => {
    console.log("Command:", command);

    // The tab argument can be missing (e.g. on Firefox < 126), so fall
    // back to querying the last focused window. Don't use
    // `currentWindow: true` here: when a DevTools window has focus it
    // matches that window, which has no tabs.
    const activeTab =
      tab ??
      (await browser.tabs.query({ active: true, lastFocusedWindow: true }))[0];
    if (!activeTab?.id) {
      console.warn("No active tab found for command:", command);
      return;
    }

    // All commands are like `copy_as_format_*` (*: 1 or 2 or 3)
    const formatIndex = command.slice(-1);
    console.log("format: ", formatIndex);

    const key = `optionalFormat${formatIndex}` as keyof OptionsType;
    const options = (await browser.storage.local.get(
      INITIAL_OPTION_VALUES,
    )) as OptionsType;

    const title = activeTab.title || "";
    const url = activeTab.url || "";

    console.log(url, title);
    console.log(options);

    await browser.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: copyToClipboard,
      args: [options[key], title, escapeBrackets(url)],
    });

    // MV2 (Firefox) uses browserAction instead of action
    const action = browser.action ?? browser.browserAction;
    action.setBadgeText({ text: formatIndex });
    setTimeout(() => {
      action.setBadgeText({ text: "" });
    }, 1000);

    console.log("done!");
  });
});
