import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Toast,
  Radio,
  RadioGroup,
  ButtonType,
} from "react-lightning-design-system";
import { unescapeTabsAndNewLines, escapeTabsAndNewLines } from "../util";
import { Format, formats } from "../constant";
import { cloneDeep } from "lodash";

// TODO Modify Template

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
  // State for Create new Template
  const [tempFormat, setTempFormat] = useState<Format>({
    name: "",
    template: "",
  });

  useEffect(() => {
    chrome.storage.local.get(initialValue, (savedOptions: OptionsType) => {
      // console.log("Init", savedOptions);
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
      <h1 className="slds-text-heading_large slds-m-bottom_small">Options</h1>
      <h2 className="slds-text-heading_medium slds-m-bottom_small">
        Select Default Template
      </h2>
      <RadioGroup>
        {options.formats.map((format) => (
          <Radio
            key={format.name}
            checked={options.selected_format.name === format.name}
            onChange={(e) => {
              setOptions(
                ((opts: OptionsType, name: string) => {
                  const modified_opts = cloneDeep(opts);
                  modified_opts.selected_format = findFormatByName(
                    name,
                    modified_opts.formats
                  );
                  onSave(modified_opts);
                  return modified_opts;
                })(options, e.currentTarget.value)
              );
            }}
            label={format.name}
            value={format.name}
          />
        ))}
      </RadioGroup>
      <h2 className="slds-text-heading_medium slds-m-bottom_small">
        Create Custom Template
      </h2>
      <Form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          ((opts: OptionsType, format: Format) => {
            const modified_opts = cloneDeep(opts);
            modified_opts.formats.push({
              name: format.name,
              template: unescapeTabsAndNewLines(format.template),
            });
            setOptions(modified_opts);
            onSave(modified_opts);
            return modified_opts;
          })(options, tempFormat);
          setTempFormat({ name: "", template: "" });
        }}
      >
        <div>
          You can use <code>\n</code> for new lines, and <code>\t</code> for
          tabs.
        </div>
        <div>You can not have the same name in template</div>

        <Input
          label="Custom Format Template Name"
          placeholder="My Custom"
          value={tempFormat.name}
          onChange={(e) =>
            setTempFormat({ ...tempFormat, name: e.target.value })
          }
          required
        />
        <Input
          label="Format Template"
          placeholder="[${title}](${url})"
          value={tempFormat.template}
          onChange={(e) =>
            setTempFormat({ ...tempFormat, template: e.target.value })
          }
          required
        />
        <Button label="Submit" htmlType="submit" type="brand" />
        <Button
          label="Reset"
          type="destructive"
          onClick={(e) => {
            setOptions(initialValue);
            onSave(initialValue);
            setTempFormat({ name: "", template: "" });
          }}
        />
      </Form>
    </div>
  );
};
