import { PENDING_FORMAT_KEY } from "../src/constant";
import type { OptionsType } from "../src/options/Options";

export default defineBackground(() => {
  browser.commands.onCommand.addListener(async (command) => {
    console.log("Command:", command);

    // All commands are like `copy_as_format_*` (*: 1 or 2)
    const formatIndex = command.slice(-1);
    const key = `optionalFormat${formatIndex}` as keyof OptionsType;

    // Tell the popup which format to copy with, then open it. The popup
    // performs the actual clipboard copy on load (see
    // entrypoints/popup/main.tsx) and shows the confirmation UI.
    await browser.storage.session.set({ [PENDING_FORMAT_KEY]: key });

    try {
      await browser.action.openPopup();
    } catch (e) {
      // openPopup can reject (e.g. no active browser window). Drop the
      // pending format so a later toolbar-icon click isn't affected.
      console.warn("Failed to open popup:", e);
      await browser.storage.session.remove(PENDING_FORMAT_KEY);
    }

    console.log("done!");
  });
});
