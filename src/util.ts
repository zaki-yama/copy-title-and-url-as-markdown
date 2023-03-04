export function escapeTabsAndNewLines(str: string) {
  return str.replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}

export function unescapeTabsAndNewLines(str: string) {
  return str.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
}

export function removeZeroWidthWhiteSpace(str: string) {
  return str.replace(/[\u200c\u200b\u200d\u202c\u2060\u2061\u2062\u2063\u2064\ufeff]/, '');
}

export function escapeBrackets(str: string) {
  return str
    .replace(/\(/g, escape)
    .replace(/\)/g, escape)
    .replace(/\[/g, escape)
    .replace(/\]/g, escape);
}

export function copyToClipboard(template: string, title: string, url: string) {
  console.log("copyToClipboard", template, title, url);

  const textToCopy = template.replace("${title}", title).replace("${url}", url);

  const listener = (event: any) => {
    event.clipboardData.setData("text/plain", `${textToCopy}`);
    event.preventDefault();
  };
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);

  console.log("Successfully copied to clipboard: " + textToCopy);
}
