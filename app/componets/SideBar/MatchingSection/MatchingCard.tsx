export const MatchingCard = ({ current, total, time, title, desc }: any) => (
  <div className="group p-4 bg-orange-50 rounded-2xl border border-orange-100 hover:shadow-md transition-all cursor-pointer">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] bg-white text-orange-600 px-2 py-1 rounded-lg font-bold shadow-sm">
        {current}/{total} 명 참여중
      </span>
      <span className="text-[10px] text-orange-400 font-bold">마감 {time}</span>
    </div>
    <h4 className="font-bold text-gray-800 group-hover:underline">{title}</h4>
    <p className="text-xs text-gray-500 mt-1">{desc}</p>
  </div>
);
