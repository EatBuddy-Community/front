import React from "react";

interface TagsProps {
  list: string[]; // 문자열 배열
  activeCategory: string; // 현재 선택된 카테고리 (문자열)
  setActiveCategory: (category: string) => void; // 카테고리를 변경하는 함수
}

const Tags = ({ list, activeCategory, setActiveCategory }: TagsProps) => {
  return (
    <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar mb-4">
      {list.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm border ${
            activeCategory === cat
              ? "bg-orange-500 border-orange-500 text-white"
              : "bg-white border-gray-100 text-gray-500 hover:border-orange-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Tags;
