import type { CopyToClipboardMessage } from "../../src/messages";

// Offscreen documents are never focused, so the async Clipboard API
// (navigator.clipboard) is not usable here; execCommand("copy") works
// without focus thanks to the clipboardWrite permission.
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
browser.runtime.onMessage.addListener((message: CopyToClipboardMessage) => {
  if (message?.target !== "offscreen" || message?.type !== "copy-to-clipboard") {
    return;
  }

  const textarea = document.querySelector<HTMLTextAreaElement>("#clipboard")!;
  textarea.value = message.text;
  textarea.select();
  document.execCommand("copy");
});
