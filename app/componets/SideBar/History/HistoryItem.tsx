interface HistoryItemProps {
  isLatest: boolean;
  date: string;
  content: string;
}

export const HistoryItem = ({ isLatest, date, content }: HistoryItemProps) => {
  return (
    <div className="relative">
      {/* 타임라인 포인트 (가장 최근 활동은 주황색, 나머지는 회색) */}
      <div
        className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm 
        ${isLatest ? "bg-orange-500" : "bg-gray-300"}`}
      />
      <p className="text-[10px] text-gray-400 font-bold uppercase">{date}</p>
      <p className="text-[13px] text-gray-600">{content}</p>
    </div>
  );
};
