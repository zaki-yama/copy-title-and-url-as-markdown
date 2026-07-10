import { INITIAL_OPTION_VALUES } from "../components/constant";
import type { CopyToClipboardMessage } from "../components/messages";
import type { OptionsType } from "../components/options/Options";
import { buildTemplate, escapeBrackets } from "../components/util";

const OFFSCREEN_URL = "/offscreen.html";

// The service worker has no DOM and Chrome doesn't expose
// navigator.clipboard to extension service workers, so the actual
// clipboard write happens in an offscreen document.
// https://developer.chrome.com/docs/extensions/reference/api/offscreen
async function copyViaOffscreen(text: string) {
  const contexts = await browser.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [browser.runtime.getURL(OFFSCREEN_URL)],
  });
  if (contexts.length === 0) {
    await browser.offscreen.createDocument({
      url: OFFSCREEN_URL,
      reasons: ["CLIPBOARD"],
      justification:
        "Write the formatted tab title and URL to the clipboard when a keyboard shortcut is pressed.",
    });
  }

  const message: CopyToClipboardMessage = {
    target: "offscreen",
    type: "copy-to-clipboard",
    text,
  };
  await browser.runtime.sendMessage(message);
}

export default defineBackground(() => {
  browser.commands.onCommand.addListener(async (command, tab) => {
    console.log("Command:", command);

    // Fall back to a query in case the tab argument is missing. Don't
    // use `currentWindow: true` here: when a DevTools window has focus
    // it matches that window, which has no tabs.
    const activeTab =
      tab ?? (await browser.tabs.query({ active: true, lastFocusedWindow: true }))[0];
    if (!activeTab) {
      console.warn("No active tab found for command:", command);
      return;
    }

    // All commands are like `copy_as_format_*` (*: 1 or 2 or 3)
    const formatIndex = command.slice(-1);
    console.log("format: ", formatIndex);

    const key = `optionalFormat${formatIndex}` as keyof OptionsType;
    const options = (await browser.storage.local.get(INITIAL_OPTION_VALUES)) as OptionsType;

    const title = activeTab.title || "";
    const url = activeTab.url || "";

    console.log(url, title);
    console.log(options);

    await copyViaOffscreen(buildTemplate(options[key], title, escapeBrackets(url)));

    browser.action.setBadgeText({ text: formatIndex });
    setTimeout(() => {
      browser.action.setBadgeText({ text: "" });
    }, 1000);

    console.log("done!");
  });
});
