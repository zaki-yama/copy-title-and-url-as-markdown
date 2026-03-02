import type { Story } from "@ladle/react";
import React from "react";
import { Popup } from "./Popup";

export default {
  title: "Popup",
};

const style = {
  width: "300px",
};

export const Standard: Story = () => (
  <div style={style}>
    <Popup title="Test title" url="https://example.com" />
  </div>
);
