export function escapeTabsAndNewLines(str: string) {
  return str.replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}

export function unescapeTabsAndNewLines(str: string) {
  return str.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
}

export function escapeBrackets(str: string) {
  return str
    .replace(/\(/g, escape)
    .replace(/\)/g, escape)
    .replace(/\[/g, escape)
    .replace(/\]/g, escape);
}

// COMMENT Maybe it's better to pass a hook (a callback function) from template
export function copyToClipboard(
  template: string,
  tab: chrome.tabs.Tab,
  isDecode = false
) {
  console.log("copyToClipboard", template, tab.title, tab.url);
  const title = tab.title;
  let escapedUrl = escapeBrackets(tab.url);
  if (isDecode) {
    escapedUrl = decodeURI(escapedUrl);
  }
  const el = document.getElementById("dummy") as HTMLTextAreaElement;
  const textToCopy = template
    .replace("${title}", title)
    .replace("${url}", escapedUrl);

  el.value = textToCopy;
  el.select();
  document.execCommand("copy");

  console.log("Successfully copied to clipboard: " + textToCopy);
}

export function copyToClipboardFromUrl(
  template: string,
  title: string,
  url: string,
  isDecode = false
) {
  console.log("copyToClipboard", template, title, url);
  let escapedUrl = escapeBrackets(url);
  if (isDecode) {
    escapedUrl = decodeURI(escapedUrl);
  }
  const el = document.getElementById("dummy") as HTMLTextAreaElement;
  const textToCopy = template
    .replace("${title}", title)
    .replace("${url}", escapedUrl);

  el.value = textToCopy;
  el.select();
  document.execCommand("copy");

  console.log("Successfully copied to clipboard: " + textToCopy);
}
