import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
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
    <div className="w-[300px] mx-auto mt-8 space-y-4">
      {showToast && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Successfully Saved.
          </AlertDescription>
        </Alert>
      )}
      <h1 className="text-xl font-semibold text-slate-900">Options</h1>
      <p className="text-sm text-slate-600">
        You can use{" "}
        <code className="font-mono bg-slate-100 px-1 rounded">\n</code> for new
        lines, and{" "}
        <code className="font-mono bg-slate-100 px-1 rounded">\t</code> for
        tabs.
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Input
            id="format"
            onChange={(e) => handleChange("format", e.target.value)}
            value={options.format}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="optionalFormat1">Optional Format #1</Label>
          <Input
            id="optionalFormat1"
            onChange={(e) => handleChange("optionalFormat1", e.target.value)}
            value={options.optionalFormat1}
          />
        </div>
        <div className="space-y-2">
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
