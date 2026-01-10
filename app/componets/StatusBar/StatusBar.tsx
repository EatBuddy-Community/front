export const StatusBar = () => {
  return (
    <div className="absolute right-5 bottom-5 z-[999] w-[320px] bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-100 p-3 flex items-center gap-3">
      {/* 이미지 */}
      <div className="w-14 h-14 bg-gray-200 rounded-xl flex-shrink-0" />

      {/* 정보 */}
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-800">어니언 성수</h4>
        <p className="text-[11px] text-gray-400">카페 · 성동구 성수동</p>
        <p className="text-[11px] text-orange-500 font-bold mt-0.5">
          ★ 4.9 (리뷰 128)
        </p>
      </div>

      <div className="relative flex h-3 w-3">
        {/* 1. 뒤에서 퍼져나가는 애니메이션 원 */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>

        {/* 2. 중심이 되는 진한 주황색 원 */}
        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
      </div>
    </div>
  );
};
