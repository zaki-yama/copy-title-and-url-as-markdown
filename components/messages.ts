export type CopyToClipboardMessage = {
  target: "offscreen";
  type: "copy-to-clipboard";
  text: string;
};
