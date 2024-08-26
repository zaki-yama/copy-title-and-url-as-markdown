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

export function copyToClipboard(template: string, title: string, url: string, host: string) {
  console.log("copyToClipboard", template, title, url, host);

  const textToCopy = template.replace("${title}", title).replace("${url}", url).replace("${host}", host);

  const listener = (event: any) => {
    event.clipboardData.setData("text/plain", `${textToCopy}`);
    event.preventDefault();
  };
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);

  console.log("Successfully copied to clipboard: " + textToCopy);
}
