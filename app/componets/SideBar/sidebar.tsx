import React, { useState } from "react";
import Tags from "../Tags/Tags";
import { MatchingSection } from "./MatchingSection/MatchingSection";
import { FavoriteSection } from "./FavoriteItem/FavoriteSection";
import { TrendSection } from "./TrendSection/TrendSection";
import HistorySection from "./History/HistorySection";
import SearchResultList from "./SearchResultList/SearchResultList";
interface SideBarProps {
  places: any[];
  onPlaceClick: (place: any) => void;
}

export const Sidebar = ({ places, onPlaceClick }: SideBarProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState<string>(""); // 1. 검색어 상태 추가
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
  const DUMMY_TRENDS = [
    {
      rank: 1,
      name: "진미 평양냉면",
      count: "매칭 42회",
      status: "up", // 순위 상승 표시용
      category: "한식",
    },
    {
      rank: 2,
      name: "쵸리상경",
      count: "매칭 38회",
      status: "same",
      category: "솥밥",
    },
    {
      rank: 3,
      name: "우동 가조쿠",
      count: "매칭 31회",
      status: "down",
      category: "일식",
    },
    {
      rank: 4,
      name: "난포 성수",
      count: "매칭 29회",
      status: "new",
      category: "퓨전",
    },
    {
      rank: 5,
      name: "카페 노티드",
      count: "매칭 25회",
      status: "up",
      category: "디저트",
    },
  ];

  const filteredPlaces =
    places?.filter((place) => {
      // 카카오맵 API는 장소명을 'place_name'에 담아줍니다.
      const name = place?.place_name || "";
      const category = place?.category_name || "";

      const matchesSearch = name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "전체" ||
        category.includes(activeCategory.replace(/^[^\s]+\s/, ""));

      return matchesSearch && matchesCategory;
    }) || [];

  // 검색 중인지 확인 (검색어가 있거나 특정 카테고리가 선택된 경우)
  const isSearching = searchQuery.length > 0 || activeCategory !== "전체";

  return (
    <aside className="w-[400px] h-screen bg-white border-r border-gray-200 flex flex-col shadow-2xl z-20 overflow-hidden">
      <div className="p-6 pb-4">
        <h1 className="text-3xl font-extrabold text-orange-500 italic mb-4">
          EatBuddy
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="오늘 뭐 먹을까?"
            value={searchQuery} // 3. 값 바인딩
            onChange={(e) => setSearchQuery(e.target.value)} // 4. 입력 시 상태 업데이트
            className="w-full bg-gray-100 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all"
          />
          <span className="absolute right-4 top-3.5 text-gray-400">🔍</span>
        </div>
      </div>

      <Tags
        list={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="flex-1 overflow-y-auto px-6 space-y-8 pb-10 custom-scrollbar">
        {isSearching ? (
          // 5. 검색 결과 리스트 (검색 중일 때만 노출)
          <SearchResultList
            places={filteredPlaces}
            onPlaceClick={onPlaceClick}
          />
        ) : (
          // 7. 평상시 홈 화면 (기존 섹션들)
          <>
            <MatchingSection />
            <FavoriteSection favorites={DUMMY_FAVORITES} />
            <TrendSection trends={DUMMY_TRENDS} />
            <HistorySection />
          </>
        )}
      </div>
    </aside>
  );
};
