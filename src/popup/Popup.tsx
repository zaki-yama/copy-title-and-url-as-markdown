import React from "react";
import { CheckCircle2 } from "lucide-react";

import "./Popup.css";

type Props = {
  title: string;
  url: string;
};

export const Popup: React.FC<Props> = ({ title, url }) => {
  return (
    <div className="w-[400px] p-4 space-y-3">
      <div className="flex justify-center">
        <CheckCircle2 className="text-green-500 w-10 h-10" />
      </div>
      <div className="text-base font-semibold text-slate-900">{title}</div>
      <div className="text-sm break-all text-slate-500">{url}</div>
    </div>
  );
};
