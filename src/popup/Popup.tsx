import React from "react";
import { CheckCircle2 } from "lucide-react";

import "./Popup.css";

type Props = {
  title: string;
  url: string;
};

export const Popup: React.FC<Props> = ({ title, url }) => {
  return (
    <div className="flex flex-col items-center gap-3 p-4 w-[400px]">
      <div className="flex justify-center">
        <CheckCircle2 className="text-green-500" size={48} />
      </div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs break-all text-gray-600">{url}</div>
    </div>
  );
};
