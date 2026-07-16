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

// Human-readable labels shown in the popup, matching the Options screen.
// `null` means the main format, for which no label is shown.
const FORMAT_LABELS: Record<keyof OptionsType, string | null> = {
  format: null,
  optionalFormat1: "Optional Format #1",
  optionalFormat2: "Optional Format #2",
};

async function main() {
  // When opened via a keyboard shortcut, the background script records
  // which optional format to use. Consume it (and reset) so a normal
  // toolbar-icon click falls back to the main format.
  const { [PENDING_FORMAT_KEY]: pendingKey } = await chrome.storage.session.get(PENDING_FORMAT_KEY);
  if (pendingKey) {
    await chrome.storage.session.remove(PENDING_FORMAT_KEY);
  }

  const options = (await chrome.storage.local.get(INITIAL_OPTION_VALUES)) as OptionsType;

  // Use the requested optional format only when it's actually configured;
  // otherwise fall back to (and label as) the main format.
  const requestedKey = pendingKey as keyof OptionsType | undefined;
  const formatKey: keyof OptionsType =
    requestedKey && options[requestedKey] ? requestedKey : "format";

  const [tab] = await chrome.tabs.query(queryInfo);
  const title = tab?.title || "";
  const url = tab?.url || "";
  copyToClipboard(options[formatKey], title, escapeBrackets(url));

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Popup title={title} url={escapeBrackets(url)} formatLabel={FORMAT_LABELS[formatKey]} />
    </React.StrictMode>,
  );
}

main();
