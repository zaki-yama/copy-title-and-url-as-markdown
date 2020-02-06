import React, { useState, useEffect } from "react";
import { Form, Input, Button, Toast } from "react-lightning-design-system";
import { unescapeTabsAndNewLines, escapeTabsAndNewLines } from "../util";

export const Options: React.FC = () => {
  const [options, setOptions] = useState<{ format: string }>({
    format: ""
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(
      {
        format: "[${title}](${url})"
      },
      (savedOptions: { format: string }) => {
        setOptions({ format: escapeTabsAndNewLines(savedOptions.format) });
      }
    );
  }, []);

  const handleChange = e => {
    setOptions({ format: e.target.value });
  };

  const onSave = e => {
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
      <Form className="form">
        <Input label="Format" onChange={handleChange} value={options.format} />
        <Button className="slds-m-top_medium" type="brand" onClick={onSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};
