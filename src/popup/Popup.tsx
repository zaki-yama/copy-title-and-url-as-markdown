import React from "react";
import { CheckCircle2 } from "lucide-react";

import "./Popup.css";

type Props = {
  title: string;
  url: string;
};

export const Popup: React.FC<Props> = ({ title, url }) => {
  return (
    <div className="flex flex-col gap-2 p-4 w-[400px]">
      <div className="flex justify-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
      </div>
      <div className="text-base font-semibold">{title}</div>
      <div className="text-sm break-all text-muted-foreground">{url}</div>
    </div>
  );
};
