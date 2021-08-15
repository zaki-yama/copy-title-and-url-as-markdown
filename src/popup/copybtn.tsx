import React from "react";
import * as CSS from "csstype";
import {
  Icon,
  Grid,
  Row,
  Button,
  ButtonGroup,
} from "react-lightning-design-system";
import { copyToClipboardFromUrl } from "../util";
import { Format } from "../constant";
import { CSSProperties } from "markdown-to-jsx/node_modules/@types/react";
type Props = {
  title: string;
  url: string;
  format: Format;
};

const btnGrpStyle: CSS.Properties = {
  justifyContent: "center",
  alignContent: "center",
  marginBottom: "1em",
};
export const CopyButton: React.FC<Props> = ({ title, url, format }) => {
  return (
    <ButtonGroup style={btnGrpStyle}>
      <Button
        type="brand"
        label={`${format.name}`}
        onClick={(e) => {
          copyToClipboardFromUrl(format.template, title, url);
          window.close();
        }}
      />
      <Button
        type="neutral"
        label="Decoded"
        onClick={(e) => {
          copyToClipboardFromUrl(format.template, title, url, true);
          window.close();
        }}
      />
    </ButtonGroup>
  );
};
