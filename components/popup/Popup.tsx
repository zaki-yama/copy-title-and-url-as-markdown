import { CheckCircle2 } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  url: string;
};

export const Popup: React.FC<Props> = ({ title, url }) => {
  return (
    <div className="flex flex-col gap-2 p-4 w-[400px]">
      <div className="flex justify-center">
        <CheckCircle2 className="text-green-500" size={32} />
      </div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs break-all text-gray-500">{url}</div>
    </div>
  );
};
