import React, { useState, useEffect } from "react";
import { Form, Input, Button, Toast } from "react-lightning-design-system";
import { unescapeTabsAndNewLines, escapeTabsAndNewLines } from "../util";
import { INITIAL_OPTION_VALUES } from "../constant";

import "./Options.css";

export type OptionsType = {
  mdFormat: string;
  htmlFormat: string;
  optionalFormat1: string;
  optionalFormat2: string;
};

export const Options: React.FC = () => {
  const [options, setOptions] = useState<OptionsType>({
    mdFormat: "",
    htmlFormat: "",
    optionalFormat1: "",
    optionalFormat2: "",
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(INITIAL_OPTION_VALUES, (savedOptions) => {
      setOptions({
        mdFormat: escapeTabsAndNewLines(savedOptions.mdFormat || savedOptions.format),
        htmlFormat: escapeTabsAndNewLines(savedOptions.htmlFormat || savedOptions.format),
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
        mdFormat: escapeTabsAndNewLines(options.mdFormat),
        htmlFormat: escapeTabsAndNewLines(options.htmlFormat),
        optionalFormat1: escapeTabsAndNewLines(options.optionalFormat1),
        optionalFormat2: escapeTabsAndNewLines(options.optionalFormat2),
      },
      () => {
        setShowToast(true);
      }
    );
  };

  return (
    <div className="optionsContainer">
      {showToast ? (
        <Toast
          className="toast"
          level="success"
          icon="success"
          onClose={() => setShowToast(false)}
        >
          Successfully Saved.
        </Toast>
      ) : null}
      <div className="slds-text-heading_medium slds-m-bottom_small">
        Options
      </div>
      <div>
        You can use <code>\n</code> for new lines, and <code>\t</code> for tabs.
      </div>
      <Form className="form">
        <Input
          label="Format"
          onChange={(e) => handleChange("mdFormat", e.target.value)}
          value={options.mdFormat}
        />
        <Input
          label="Rich Format (HTML)"
          onChange={(e) => handleChange("htmlFormat", e.target.value)}
          value={options.htmlFormat}
        />
        <Input
          label="Optional Format #1"
          onChange={(e) => handleChange("optionalFormat1", e.target.value)}
          value={options.optionalFormat1}
        />
        <Input
          label="Optional Format #2"
          onChange={(e) => handleChange("optionalFormat2", e.target.value)}
          value={options.optionalFormat2}
        />
        <Button className="slds-m-top_medium" type="brand" onClick={onSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};
