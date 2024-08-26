import type { OptionsType } from "./options/Options";

// markdown style
export const DEFAULT_MARKDOWN_FORMAT = "[${title}](${url}) <small>(${host})</small>";
// equivalent html
export const DEFAULT_HTML_FORMAT = "<a href=\"${url}\">${title}</a> <small>(${host})</small>";

export const INITIAL_OPTION_VALUES: OptionsType = {
  mdFormat: DEFAULT_MARKDOWN_FORMAT,
  htmlFormat: DEFAULT_HTML_FORMAT,
  optionalFormat1: "",
  optionalFormat2: "",
};

