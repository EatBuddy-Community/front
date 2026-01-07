import React, { useState } from "react";
interface SideBarProps {
  places: any[];
  onPlaceClick: (place: any) => void;
}

export const Sidebar = ({ places, onPlaceClick }: SideBarProps) => {
  const [activeCategory, setActiveCategory] = useState("전체");

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
      <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar mb-4">
        {["전체", "🍚 한식", "🍣 일식", "🍕 양식", "☕ 카페", "🍺 술집"].map(
          (cat) => (
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
          )
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-8 pb-10 custom-scrollbar">
        {/* 3. 실시간 매칭 현황 (🔥) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="animate-pulse">🔥</span> 지금 매칭 중인 곳
            </h2>
            <span className="text-[11px] text-orange-500 font-bold hover:underline cursor-pointer">
              더보기
            </span>
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="group p-4 bg-orange-50 rounded-2xl border border-orange-100 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] bg-white text-orange-600 px-2 py-1 rounded-lg font-bold shadow-sm">
                    2/4 명 참여중
                  </span>
                  <span className="text-[10px] text-orange-400 font-bold">
                    마감 15분 전
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 underline-offset-4 group-hover:underline">
                  성수동 갓잇 (GODEAT)
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  "멕시칸 요리 같이 드실 버디 구해요! 🌮"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 마이 플레이스 (즐겨찾기) */}
        <section>
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            ⭐ 내가 찜한 맛집
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-gray-100"
              >
                <div className="w-14 h-14 bg-gray-200 rounded-xl flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    어니언 성수
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    카페 · 성동구 성수동
                  </p>
                  <p className="text-[11px] text-orange-500 font-bold">
                    ★ 4.9 (리뷰 128)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

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
