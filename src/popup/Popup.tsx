import React from "react";
import { Icon, Grid, Row, Button } from "react-lightning-design-system";
import { CopyButton } from "./copybtn";
import { Format } from "../constant";
import { OptionsType } from "../options/Options";
type Props = {
  title: string;
  url: string;
  opts: OptionsType;
};

// TODO Default Template Indicator
export const Popup: React.FC<Props> = ({ title, url, opts }) => {
  return (
    <Grid className="slds-gutters">
      <Row cols={1}>
        <div className="slds-text-heading_small">{title}</div>
      </Row>
      <Row cols={1}>
        <div
          className="slds-text-body_small"
          style={{ wordBreak: "break-all" }}
        >
          {`${opts.isDecoded ? decodeURI(url) : url}`}
        </div>
      </Row>
      <Row cols={1}>
        <div>{`has been copy as ${opts.selected_format.name} ${
          opts.isDecoded ? "(Decoded)" : ""
        }`}</div>
      </Row>
      <hr />
      <Row cols={1}>
        <div className="slds-text-heading_small">Copy as</div>
      </Row>
      {opts.formats.map((format) => (
        <CopyButton key={format.name} title={title} url={url} format={format} />
      ))}
    </Grid>
  );
};
