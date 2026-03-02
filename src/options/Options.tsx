import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { unescapeTabsAndNewLines, escapeTabsAndNewLines } from "../util";
import { INITIAL_OPTION_VALUES } from "../constant";
import { type Theme, applyTheme } from "../theme";

export type OptionsType = {
  format: string;
  optionalFormat1: string;
  optionalFormat2: string;
  theme: Theme;
};

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
];

export const Options: React.FC = () => {
  const [options, setOptions] = useState<OptionsType>({
    format: "",
    optionalFormat1: "",
    optionalFormat2: "",
    theme: "system",
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(INITIAL_OPTION_VALUES, (savedOptions) => {
      setOptions({
        format: escapeTabsAndNewLines(savedOptions.format),
        optionalFormat1: escapeTabsAndNewLines(savedOptions.optionalFormat1),
        optionalFormat2: escapeTabsAndNewLines(savedOptions.optionalFormat2),
        theme: savedOptions.theme,
      });
    });
  }, []);

  useEffect(() => {
    applyTheme(options.theme);

    if (options.theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [options.theme]);

  const handleChange = (key: keyof OptionsType, value: string) => {
    setOptions({ ...options, [key]: value });
  };

  const onSave = () => {
    chrome.storage.local.set(
      {
        format: unescapeTabsAndNewLines(options.format),
        optionalFormat1: unescapeTabsAndNewLines(options.optionalFormat1),
        optionalFormat2: unescapeTabsAndNewLines(options.optionalFormat2),
        theme: options.theme,
      },
      () => {
        setShowToast(true);
      },
    );
  };

  return (
    <div className="w-[300px] mx-auto mt-8 dark:text-white">
      {showToast && (
        <div className="mb-4 flex items-center justify-between rounded-md bg-green-100 px-4 py-3 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
          <span>Successfully Saved.</span>
          <button
            onClick={() => setShowToast(false)}
            className="ml-4 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-100"
          >
            ✕
          </button>
        </div>
      )}
      <h1 className="text-lg font-semibold mb-2 dark:text-white">Options</h1>
      <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
        You can use <code className="rounded bg-gray-100 px-1 dark:bg-gray-700 dark:text-gray-200">\n</code> for new lines, and <code className="rounded bg-gray-100 px-1 dark:bg-gray-700 dark:text-gray-200">\t</code> for tabs.
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Theme</Label>
          <div className="flex rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
            {THEME_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleChange("theme", value)}
                className={`flex-1 py-1.5 text-sm transition-colors ${
                  options.theme === value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="format">Format</Label>
          <Input
            id="format"
            onChange={(e) => handleChange("format", e.target.value)}
            value={options.format}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="optionalFormat1">Optional Format #1</Label>
          <Input
            id="optionalFormat1"
            onChange={(e) => handleChange("optionalFormat1", e.target.value)}
            value={options.optionalFormat1}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="optionalFormat2">Optional Format #2</Label>
          <Input
            id="optionalFormat2"
            onChange={(e) => handleChange("optionalFormat2", e.target.value)}
            value={options.optionalFormat2}
          />
        </div>
        <Button className="mt-2" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
