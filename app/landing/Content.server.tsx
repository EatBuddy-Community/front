"use client";
import { useState } from "react";
import Tags from "../componets/DraftTag/Tags";
import ToggleSwitchButton from "../componets/ToggleSwitch.tsx/ToggleSwitchButton";

export default function Content() {
  const [seletedTag, setSeletedTag] = useState<string | null>(null);
  return (
    <div className="flex flex-col h-[640px] justify-between pt-5">
      <div className="flex justify-center gap-3">
        <input
          className="border-2 min-w-108 h-10 pl-4 rounded-2xl bg-white"
          type="search"
        ></input>
        <ToggleSwitchButton />
      </div>
      <div className="flex justify-center gap-3">
        <Tags label="전체" />
        <Tags label="치킨" />
        <Tags label="족발" />
        <Tags label="족발" />
      </div>
    </div>
  );
}
