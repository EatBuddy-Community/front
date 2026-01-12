import { MatchingCard } from "./MatchingCard";

export const MatchingSection = () => (
  <section>
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-bold text-gray-800 flex items-center gap-2">
        <span className="animate-pulse">🔥</span> 지금 매칭 중인 곳
      </h2>
      <button className="text-[11px] text-orange-500 font-bold hover:underline">더보기</button>
    </div>
    <div className="space-y-3">
      {/* 나중에는 props로 받은 데이터를 map 돌립니다 */}
      <MatchingCard current={2} total={4} time="15분 전" title="성수동 갓잇" desc="멕시칸 같이 먹어요! 🌮" />
    </div>
  </section>
);