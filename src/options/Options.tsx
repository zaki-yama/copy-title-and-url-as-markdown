import React, { useState, useEffect } from "react";
import { Form, Input, Button, Toast } from "react-lightning-design-system";
import { unescapeTabsAndNewLines, escapeTabsAndNewLines } from "../util";
import { DEFAULT_FORMAT } from "../constant";

export const Options: React.FC = () => {
  const [options, setOptions] = useState<{ format: string }>({
    format: "",
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(
      {
        format: DEFAULT_FORMAT,
      },
      (savedOptions: { format: string }) => {
        setOptions({ format: escapeTabsAndNewLines(savedOptions.format) });
      }
    );
  }, []);

  const handleChange = (e) => {
    setOptions({ format: e.target.value });
  };

  const onSave = (e) => {
    chrome.storage.local.set(
      { format: unescapeTabsAndNewLines(options.format) },
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
        <Input label="Format" onChange={handleChange} value={options.format} />
        <Button className="slds-m-top_medium" type="brand" onClick={onSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};
