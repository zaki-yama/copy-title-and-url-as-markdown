import type { OptionsType } from "./options/Options";

// markdown style
export const DEFAULT_FORMAT = "[${title}](${url})";

export const INITIAL_OPTION_VALUES: OptionsType = {
  format: DEFAULT_FORMAT,
  optionalFormat1: "",
  optionalFormat2: "",
};
