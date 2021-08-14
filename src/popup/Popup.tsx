import React from "react";
import { Icon, Grid, Row, Button } from "react-lightning-design-system";
import { CopyButton } from "./copybtn";
import { Format } from "../constant";
type Props = {
  title: string;
  url: string;
  formats: Format[];
  selected_format?: Format;
};

export const Popup: React.FC<Props> = ({
  title,
  url,
  formats,
  selected_format,
}) => {
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
          {url}
        </div>
      </Row>
      {formats.map((format) => (
        <Row key={format.name}>
          <CopyButton title={title} url={url} format={format} />
        </Row>
      ))}
    </Grid>
  );
};
