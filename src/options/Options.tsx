import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Toast,
  Radio,
  RadioGroup,
} from "react-lightning-design-system";
import { unescapeTabsAndNewLines, escapeTabsAndNewLines } from "../util";
import { DEFAULT_FORMAT, Format, formats } from "../constant";

// TODO Add new format dialogue
// TODO give radio a uuid

export type OptionsType = {
  selected_format: Format;
  formats: Format[];
};

const initialValue: OptionsType = {
  selected_format: formats[0],
  formats: formats,
};

export const Options: React.FC = () => {
  const [options, setOptions] = useState<OptionsType>(initialValue);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(initialValue, (savedOptions: OptionsType) => {
      console.log("Init", savedOptions);
      if (savedOptions.selected_format.name) {
        setOptions(savedOptions);
      }
    });
  }, []);

  const findFormatByName = (name: string, format_list: Format[]): Format => {
    return format_list.filter((format) => format.name === name)[0];
  };

  const onSave = () => {
    chrome.storage.local.set(options, () => {
      setShowToast(true);
    });
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
      <RadioGroup>
        {options.formats.map((format) => (
          <Radio
            key={format.name}
            id={format.name}
            checked={options.selected_format.name === format.name}
            onChange={(e) => {
              setOptions(
                ((opt: OptionsType, name: string) => {
                  const temp_opt = { ...opt };
                  temp_opt.selected_format = findFormatByName(
                    name,
                    temp_opt.formats
                  );
                  console.log("What I clicked", temp_opt.selected_format);
                  return temp_opt;
                })(options, e.currentTarget.value)
              );
              // options still not be set in this time (strangely the last time will be set)
              console.log("What changes", options.selected_format);
              onSave();
            }}
            label={format.name}
            value={format.name}
          />
        ))}
      </RadioGroup>
    </div>
  );
};
