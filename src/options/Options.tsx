import React, { useState, useEffect } from "react";
import { unescapeTabsAndNewLines, escapeTabsAndNewLines } from "../util";
import { INITIAL_OPTION_VALUES } from "../constant";

import "./Options.css";

export type OptionsType = {
  format: string;
  optionalFormat1: string;
  optionalFormat2: string;
};

export const Options: React.FC = () => {
  const [options, setOptions] = useState<OptionsType>({
    format: "",
    optionalFormat1: "",
    optionalFormat2: "",
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(INITIAL_OPTION_VALUES, (savedOptions) => {
      setOptions({
        format: escapeTabsAndNewLines(savedOptions.format),
        optionalFormat1: escapeTabsAndNewLines(savedOptions.optionalFormat1),
        optionalFormat2: escapeTabsAndNewLines(savedOptions.optionalFormat2),
      });
    });
  }, []);

  const handleChange = (key: keyof OptionsType, value: string) => {
    setOptions({ ...options, [key]: value });
  };

  const onSave = () => {
    chrome.storage.local.set(
      {
        format: unescapeTabsAndNewLines(options.format),
        optionalFormat1: unescapeTabsAndNewLines(options.optionalFormat1),
        optionalFormat2: unescapeTabsAndNewLines(options.optionalFormat2),
      },
      () => {
        setShowToast(true);
      }
    );
  };

  return (
    <div className="w-[300px] mx-auto mt-[30px]">
      {showToast && (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-4">
          <span className="text-sm">Successfully Saved.</span>
          <button
            onClick={() => setShowToast(false)}
            className="text-green-600 hover:text-green-800 ml-4 text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}
      <h1 className="text-lg font-semibold mb-3">Options</h1>
      <p className="text-sm mb-4">
        You can use <code>\n</code> for new lines, and <code>\t</code> for tabs.
      </p>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Format</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange("format", e.target.value)}
            value={options.format}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Optional Format #1</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange("optionalFormat1", e.target.value)}
            value={options.optionalFormat1}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Optional Format #2</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange("optionalFormat2", e.target.value)}
            value={options.optionalFormat2}
          />
        </div>
        <button
          type="button"
          onClick={onSave}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
        >
          Save
        </button>
      </form>
    </div>
  );
};
