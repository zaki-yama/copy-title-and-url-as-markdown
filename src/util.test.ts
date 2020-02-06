import {
  escapeTabsAndNewLines,
  unescapeTabsAndNewLines,
  escapeBrackets
} from "./util";

describe("escapeTabsAndNewLines", () => {
  test.each`
    arg                        | expected
    ${"[${title}](${url})}"}   | ${"[${title}](${url})}"}
    ${"${title}\n${url}"}      | ${"${title}\\n${url}"}
    ${"multiple\nlines\ntext"} | ${"multiple\\nlines\\ntext"}
    ${"${title}\t${url}"}      | ${"${title}\\t${url}"}
    ${"multiple\ttabs\ttext"}  | ${"multiple\\ttabs\\ttext"}
    ${"new lines\nand\ttabs"}  | ${"new lines\\nand\\ttabs"}
  `("escape tabs and new lines", ({ arg, expected }) => {
    expect(escapeTabsAndNewLines(arg)).toBe(expected);
  });
});

describe("unescapeTabsAndNewLines", () => {
  test.each`
    arg                          | expected
    ${"[${title}](${url})}"}     | ${"[${title}](${url})}"}
    ${"${title}\\n${url}"}       | ${"${title}\n${url}"}
    ${"multiple\\nlines\\ntext"} | ${"multiple\nlines\ntext"}
    ${"${title}\\t${url}"}       | ${"${title}\t${url}"}
    ${"multiple\\ttabs\\ttext"}  | ${"multiple\ttabs\ttext"}
    ${"new lines\\nand\\ttabs"}  | ${"new lines\nand\ttabs"}
  `("unescape tabs and new lines", ({ arg, expected }) => {
    expect(unescapeTabsAndNewLines(arg)).toBe(expected);
  });
});

describe("escapeBrackets", () => {
  test.each`
    arg                            | expected
    ${"https://example.com/(foo)"} | ${"https://example.com/%28foo%29"}
    ${"https://example.com/[foo]"} | ${"https://example.com/%5Bfoo%5D"}
  `("escape brackets", ({ arg, expected }) => {
    expect(escapeBrackets(arg)).toBe(expected);
  });
});
