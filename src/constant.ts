import type { OptionsType } from "./options/Options";

// markdown style
export const DEFAULT_FORMAT = "[${title}](${url})";

// Session-storage key the background script uses to tell the popup which
// format to copy with when the popup is opened via a keyboard shortcut.
export const PENDING_FORMAT_KEY = "pendingFormatKey";

export const INITIAL_OPTION_VALUES: OptionsType = {
  format: DEFAULT_FORMAT,
  optionalFormat1: "",
  optionalFormat2: "",
};
