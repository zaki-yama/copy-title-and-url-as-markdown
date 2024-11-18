import {
  escapeTabsAndNewLines,
  unescapeTabsAndNewLines,
  escapeBrackets,
  buildTemplate,
} from "./util";
import { describe, test, expect } from "vitest";

describe("escapeTabsAndNewLines", () => {
  test.each([
    ["[title}](url})}", "[title}](url})}"],
    ["title}\nurl}", "title}\\nurl}"],
    ["multiple\nlines\ntext", "multiple\\nlines\\ntext"],
    ["title}\turl}", "title}\\turl}"],
    ["multiple\ttabs\ttext", "multiple\\ttabs\\ttext"],
    ["new lines\nand\ttabs", "new lines\\nand\\ttabs"],
  ])("escape tabs and new lines", (arg, expected) => {
    expect(escapeTabsAndNewLines(arg)).toBe(expected);
  });
});

describe("unescapeTabsAndNewLines", () => {
  test.each([
    ["[title](url)", "[title](url)"],
    ["title\\nurl", "title\nurl"],
    ["multiple\\nlines\\ntext", "multiple\nlines\ntext"],
    ["title\\turl", "title\turl"],
    ["multiple\\ttabs\\ttext", "multiple\ttabs\ttext"],
    ["new lines\\nand\\ttabs", "new lines\nand\ttabs"],
  ])("unescape tabs and new lines", (arg, expected) => {
    expect(unescapeTabsAndNewLines(arg)).toBe(expected);
  });
});

describe("escapeBrackets", () => {
  test.each([
    ["https://example.com/(foo)", "https://example.com/%28foo%29"],
    ["https://example.com/[foo]", "https://example.com/%5Bfoo%5D"],
  ])("escape brackets", (arg, expected) => {
    expect(escapeBrackets(arg)).toBe(expected);
  });
});

describe("buildTemplate", () => {
  test.each([
    {
      template: "[${title}](${url})",
      title: "dummy title",
      url: "https://example.com",
      expected: "[dummy title](https://example.com)",
    },
    // multiple titles
    // ref. #348
    {
      template: "${title} - [${title}](${url})",
      title: "dummy title",
      url: "https://example.com",
      expected: "dummy title - [dummy title](https://example.com)",
    },
    // multiple urls
    {
      template: "${url} - [${title}](${url})",
      title: "dummy title",
      url: "https://example.com",
      expected: "https://example.com - [dummy title](https://example.com)",
    },
  ])("build templates", ({ template, title, url, expected }) => {
    expect(buildTemplate(template, title, url)).toBe(expected);
  });
});
