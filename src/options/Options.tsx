import React, { useState, useEffect } from "react";
import { Form, Input, Button, Toast } from "react-lightning-design-system";
import { unescapeTabsAndNewLines, escapeTabsAndNewLines } from "../util";
import { DEFAULT_FORMAT, Format, formats} from "../constant";

export type OptionsType = {
  format_template: string;
  default_formal: Format;
};

const initialValue: OptionsType = {
  format_template: DEFAULT_FORMAT,
  default_formal: formats[0],
};

export const Options: React.FC = () => {
  const [options, setOptions] = useState<OptionsType>({
    format: "",
    optionalFormat1: "",
    optionalFormat2: "",
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(initialValue, (savedOptions: OptionsType) => {
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

  const onSave = (e) => {
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
          onChange={(e) => handleChange("format", e.target.value)}
          value={options.format}
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
