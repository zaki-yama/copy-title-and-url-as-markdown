import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    <div className="w-[300px] mx-auto mt-8 flex flex-col gap-4">
      {showToast && (
        <Alert variant="success" className="relative">
          <AlertDescription>
            Successfully Saved.
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-2 right-2 text-green-600 hover:text-green-800"
            >
              ×
            </button>
          </AlertDescription>
        </Alert>
      )}
      <h1 className="text-xl font-semibold">Options</h1>
      <p className="text-sm text-muted-foreground">
        You can use <code className="font-mono text-xs">\n</code> for new
        lines, and <code className="font-mono text-xs">\t</code> for tabs.
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="format">Format</Label>
          <Input
            id="format"
            onChange={(e) => handleChange("format", e.target.value)}
            value={options.format}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="optionalFormat1">Optional Format #1</Label>
          <Input
            id="optionalFormat1"
            onChange={(e) => handleChange("optionalFormat1", e.target.value)}
            value={options.optionalFormat1}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="optionalFormat2">Optional Format #2</Label>
          <Input
            id="optionalFormat2"
            onChange={(e) => handleChange("optionalFormat2", e.target.value)}
            value={options.optionalFormat2}
          />
        </div>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};
