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

export function copyToClipboard(template: string, tab: chrome.tabs.Tab) {
  console.log("copyToClipboard", template, tab.title, tab.url);
  const title = tab.title;
  const url = escapeBrackets(tab.url);
  const el = document.getElementById("dummy") as HTMLTextAreaElement;
  const textToCopy = template.replace("${title}", title).replace("${url}", url);

  el.value = textToCopy;
  el.select();
  document.execCommand("copy");

  console.log("Successfully copied to clipboard: " + textToCopy);
}

export function copyToClipboardFromUrl(
  template: string,
  title: string,
  url: string
) {
  console.log("copyToClipboard", template, title, url);
  const el = document.getElementById("dummy") as HTMLTextAreaElement;
  const textToCopy = template.replace("${title}", title).replace("${url}", url);

  el.value = textToCopy;
  el.select();
  document.execCommand("copy");

  console.log("Successfully copied to clipboard: " + textToCopy);
}
