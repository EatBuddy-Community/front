import React, { useState } from "react";
import Tags from "../Tags/Tags";
import { MatchingSection } from "./MatchingSection/MatchingSection";
import { FavoriteSection } from "./FavoriteItem/FavoriteSection";
interface SideBarProps {
  places: any[];
  onPlaceClick: (place: any) => void;
}

export const Sidebar = ({ places, onPlaceClick }: SideBarProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const DUMMY_FAVORITES = [
    {
      id: 1,
      name: "어니언 성수",
      category: "카페",
      location: "성동구 성수동",
      rating: 4.9,
      reviewCount: 128,
    },
    {
      id: 2,
      name: "갓잇 성수점",
      category: "멕시칸",
      location: "성동구 성수동",
      rating: 4.8,
      reviewCount: 256,
    },
  ];
  const categories: string[] = [
    "전체",
    "🍚 한식",
    "🍣 일식",
    "🍕 양식",
    "☕ 카페",
    "🍺 술집",
    "🍜 중식",
  ];

  return (
    <aside className="w-[400px] h-screen bg-white border-r border-gray-200 flex flex-col shadow-2xl z-20 overflow-hidden">
      {/* 1. Header & Search */}
      <div className="p-6 pb-4">
        <h1 className="text-3xl font-extrabold text-orange-500 italic mb-4">
          EatBuddy
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="오늘 뭐 먹을까?"
            className="w-full bg-gray-100 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all"
          />
          <span className="absolute right-4 top-3.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* 2. 카테고리 필터 (Horizontal Scroll) */}
      <Tags
        list={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="flex-1 overflow-y-auto px-6 space-y-8 pb-10 custom-scrollbar">
        {/* 3. 실시간 매칭 현황 (🔥) */}
        <MatchingSection />

        {/* 4. 마이 플레이스 (즐겨찾기) */}
        <FavoriteSection favorites={DUMMY_FAVORITES} />

        {/* 5. 실시간 트렌드 랭킹 */}
        <section className="bg-gray-50 rounded-3xl p-5 border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            📈 이번 주 핫플
          </h2>
          <div className="space-y-4">
            {[
              { rank: 1, name: "진미 평양냉면", count: "매칭 42회" },
              { rank: 2, name: "쵸리상경", count: "매칭 38회" },
              { rank: 3, name: "우동 가조쿠", count: "매칭 31회" },
            ].map((item) => (
              <div
                key={item.rank}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-black ${
                      item.rank === 1 ? "text-orange-500" : "text-gray-400"
                    }`}
                  >
                    0{item.rank}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {item.name}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 활동 히스토리 */}
        <section>
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            🕒 최근 내 활동
          </h2>
          <div className="relative pl-4 border-l-2 border-orange-100 space-y-6 ml-1">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>
              <p className="text-[10px] text-gray-400 font-bold">TODAY</p>
              <p className="text-[13px] text-gray-600">
                성수동 갓잇 매칭 참여 신청
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white shadow-sm"></div>
              <p className="text-[10px] text-gray-400 font-bold">2 DAYS AGO</p>
              <p className="text-[13px] text-gray-600">
                진미 평양냉면 방문 완료
              </p>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};
