import React from "react";
import { Icon, Grid, Row } from "react-lightning-design-system";

import "./Popup.css";

type Props = {
  title: string;
  url: string;
};

export const Popup: React.FC<Props> = ({ title, url }) => {
  return (
    <Grid className="slds-gutters">
      <Row cols={1} align="center">
        <Icon category="action" icon="approval" container="circle" />
      </Row>
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
    </Grid>
  );
};
