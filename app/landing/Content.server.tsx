"use client";
import { useState } from "react";
import Tags from "../componets/DraftTag/Tags";
import ToggleSwitchButton from "../componets/ToggleSwitch.tsx/ToggleSwitchButton";
import { motion } from "framer-motion";

export default function Content() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const tags = ["전체", "메뉴1", "메뉴2", "메뉴3"];

  return (
    <div className="flex flex-col h-[640px] justify-between pt-5">
      <div className="flex justify-center gap-3">
        <input
          className="border-2 min-w-108 h-10 pl-4 rounded-2xl bg-white"
          type="search"
        />
        <ToggleSwitchButton />
      </div>

      <div className="flex justify-center gap-3 relative">
        {tags.map((tag) => (
          <motion.div
            key={tag}
            layout
            onClick={() =>
              setSelectedTag((prev) => (prev === tag ? null : tag))
            }
            className={
              tag === selectedTag ? "absolute top-[-230px]" : "relative"
            }
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Tags label={tag} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
