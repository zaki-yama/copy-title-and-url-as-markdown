export type Format = {
  template: string;
  name: string;
};

// markdown style
export const DEFAULT_FORMAT = "[${title}](${url})";
const MARKDOWN_FORMAT = "[${title}](${url})";
const ADOC_FORMAT = "${url}[${title}]";
const ORG_MODE_FORMAT = "[[${title}][${url}]]";

export const formats: Format[] = [
  {
    template: MARKDOWN_FORMAT,
    name: "Markdown",
  },
  {
    template: ADOC_FORMAT,
    name: "ASCII Doc",
  },
  {
    template: ORG_MODE_FORMAT,
    name: "Org Mode",
  },
  {
    template: DEFAULT_FORMAT,
    name: "Custom",
  },
];
