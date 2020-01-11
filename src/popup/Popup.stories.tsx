import React from "react";
import { Popup } from "./Popup";

export default {
  title: "Popup"
};

const style = {
  width: "300px"
};
export const standard = () => (
  <div style={style}>
    <Popup title="Test title" url="https://example.com" />
  </div>
);
