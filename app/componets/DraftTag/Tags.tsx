import { JSX } from "react";

interface TagItem {
  label: string;
}

export default function Tags({ label }: TagItem): JSX.Element {
  return (
    <div className="min-w-8 min-h-8 border-1 max-w-8 max-h-8">
      <span>{label}</span>
    </div>
  );
}
