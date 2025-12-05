"use client";

import { create } from "zustand";

interface ToggleStore {
  isBoolean: boolean;
  toggle: () => void;
}

const useToggle = create<ToggleStore>((set) => ({
  isBoolean: false,
  toggle: () => set((state) => ({ isBoolean: !state.isBoolean })),
}));

export default function ToggleSwitchButton() {
  const { isBoolean, toggle } = useToggle();
  return (
    <div
      className={`relative flex items-center justify-between w-24 h-9 ${
        isBoolean ? "bg-amber-500" : "bg-green-500"
      } rounded-full px-3`}
      onClick={toggle}
    >
      <div
        className={`
          absolute  left-1 w-12 h-7 bg-white rounded-full flex items-center justify-center
          transition-all duration-300
          ${isBoolean ? "translate-x-0" : "translate-x-10"}
        `}
      >
        {isBoolean ? (
          <span className="text-black text-sm ml-1">밥</span>
        ) : (
          <span className="text-black text-sm mr-1">술</span>
        )}
      </div>
    </div>
  );
}
