import "../../components/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Popup } from "../../components/popup/Popup";
import { escapeBrackets, copyToClipboard } from "../../components/util";
import { DEFAULT_FORMAT } from "../../components/constant";

const queryInfo = {
  active: true,
  currentWindow: true,
};

async function main() {
  const tabs = await browser.tabs.query(queryInfo);
  const options = (await browser.storage.local.get({ format: DEFAULT_FORMAT })) as {
    format: string;
  };
  const tab = tabs[0];
  const title = tab.title || "";
  const url = tab.url || "";
  copyToClipboard(options.format, title, escapeBrackets(url));

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Popup title={title} url={escapeBrackets(url)} />
    </React.StrictMode>,
  );
}

main();
