import React from "react";
import { Icon, Grid, Row, Button } from "react-lightning-design-system";
import { copyToClipboardFromUrl } from "../util";
import { Format } from "../constant";
type Props = {
  title: string;
  url: string;
  format: Format;
};

export const CopyButton: React.FC<Props> = ({ title, url, format }) => {
  return (
    <Button onClick={() => copyToClipboardFromUrl(format.template, title, url)}>
      Copy as {format.name} Format
    </Button>
  );
};
