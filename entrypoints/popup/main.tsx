import "../../src/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Popup } from "../../src/popup/Popup";
import { escapeBrackets, copyToClipboard } from "../../src/util";
import { INITIAL_OPTION_VALUES, PENDING_FORMAT_KEY } from "../../src/constant";
import type { OptionsType } from "../../src/options/Options";

const queryInfo = {
  active: true,
  currentWindow: true,
};

async function main() {
  // When opened via a keyboard shortcut, the background script records
  // which optional format to use. Consume it (and reset) so a normal
  // toolbar-icon click falls back to the main format.
  const { [PENDING_FORMAT_KEY]: pendingKey } =
    await chrome.storage.session.get(PENDING_FORMAT_KEY);
  if (pendingKey) {
    await chrome.storage.session.remove(PENDING_FORMAT_KEY);
  }

  const options = (await chrome.storage.local.get(INITIAL_OPTION_VALUES)) as OptionsType;
  const formatKey = (pendingKey as keyof OptionsType) || "format";
  // Fall back to the main format when the optional format is unset.
  const format = options[formatKey] || options.format;

  const [tab] = await chrome.tabs.query(queryInfo);
  const title = tab?.title || "";
  const url = tab?.url || "";
  copyToClipboard(format, title, escapeBrackets(url));

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Popup title={title} url={escapeBrackets(url)} />
    </React.StrictMode>,
  );
}

main();
