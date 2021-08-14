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
import { cloneDeep } from "lodash";

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
  // This second param make it only run once

  const findFormatByName = (name: string, format_list: Format[]): Format => {
    return format_list.filter((format) => format.name === name)[0];
  };

  const onSave = (opts: OptionsType) => {
    chrome.storage.local.set(opts, () => {
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
                ((opts: OptionsType, name: string) => {
                  const modified_opts = cloneDeep(opts);
                  modified_opts.selected_format = findFormatByName(
                    name,
                    modified_opts.formats
                  );
                  console.log("What I clicked", modified_opts.selected_format);
                  onSave(modified_opts);
                  return modified_opts;
                })(options, e.currentTarget.value)
              );
              // options still not be set in this time (strangely the last time will be set)
            }}
            label={format.name}
            value={format.name}
          />
        ))}
      </RadioGroup>
    </div>
  );
};
