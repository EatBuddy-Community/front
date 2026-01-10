interface MatchingCreateSidebarProps {
  place: any;
  onBack: () => void;
  onComplete: () => void;
}

export const MatchingCreateSidebar = ({
  place,
  onBack,
  onComplete,
}: MatchingCreateSidebarProps) => {
  return (
    <aside className="w-[400px] h-screen bg-white border-r border-gray-200 flex flex-col shadow-2xl z-20 overflow-hidden">
      {/* 헤더 */}
      <div className="p-6 border-b flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-2xl hover:bg-gray-100 w-10 h-10 rounded-full transition-all"
        >
          ←
        </button>
        <h2 className="text-xl font-bold text-gray-800">매칭 만들기</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* 선택한 식당 요약 */}
        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
          <p className="text-xs text-orange-500 font-bold mb-1">선택된 식당</p>
          <h3 className="font-bold text-gray-800">
            {place?.place_name || "식당 정보 없음"}
          </h3>
          <p className="text-xs text-gray-500">{place?.category_name}</p>
        </div>

        {/* 입력 폼 섹션 */}
        <section className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              🍚 몇 명과 먹을까요?
            </label>
            <div className="flex gap-2">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  className="flex-1 py-3 border rounded-xl font-bold hover:border-orange-500 focus:bg-orange-500 focus:text-white transition-all"
                >
                  {num}명
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              ⏰ 언제 먹을까요?
            </label>
            <input
              type="time"
              className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              💬 버디들에게 한마디
            </label>
            <textarea
              placeholder="음식 취향이나 하고 싶은 말을 적어주세요 (예: 매운거 잘 먹는 분!)"
              className="w-full h-32 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 resize-none text-sm"
            />
          </div>
        </section>
      </div>

      {/* 등록 버튼 */}
      <div className="p-6 border-t">
        <button
          onClick={onComplete}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-orange-600 transition-all active:scale-95"
        >
          매칭 게시하기
        </button>
      </div>
    </aside>
  );
};
