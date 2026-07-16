import { CheckCircle2 } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  url: string;
  // Label of the format used, or null/undefined for the main format
  // (in which case no label is shown).
  formatLabel?: string | null;
};

export const Popup: React.FC<Props> = ({ title, url, formatLabel }) => {
  return (
    <div className="flex flex-col gap-2 p-4 w-[400px]">
      {formatLabel ? (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-green-500 shrink-0" size={20} />
          <span className="text-sm font-medium">Copied as {formatLabel}</span>
        </div>
      ) : (
        <div className="flex justify-center">
          <CheckCircle2 className="text-green-500" size={32} />
        </div>
      )}
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs break-all text-gray-500">{url}</div>
    </div>
  );
};
