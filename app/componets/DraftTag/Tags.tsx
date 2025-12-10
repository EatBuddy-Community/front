import { JSX } from "react";

interface TagItem {
  label: string;
  isSelected?: boolean;
}

export default function Tags({ label, isSelected }: TagItem): JSX.Element {
  return (
    <div
      className={`${
        isSelected
          ? "min-w-128 min-h-64  max-w-128 max-h-64"
          : "min-w-64 min-h-32  max-w-64 max-h-32"
      } backdrop-blur-sm bg-black/25 rounded-[10px]`}
    >
      <span>{label}</span>
    </div>
  );
}
