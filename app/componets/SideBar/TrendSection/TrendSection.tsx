interface TrendItem {
  rank: number;
  name: string;
  count: string;
}

interface TrendSectionProps {
  trends: TrendItem[];
}

export const TrendSection = ({ trends }: TrendSectionProps) => {
  return (
    <section className="bg-gray-50 rounded-3xl p-5 border border-gray-100">
      <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        📈 이번 주 핫플
      </h2>
      <div className="space-y-4">
        {trends.map((item) => (
          <div key={item.rank} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-black ${
                  item.rank === 1 ? "text-orange-500" : "text-gray-400"
                }`}
              >
                0{item.rank}
              </span>
              <span className="text-sm font-medium text-gray-700 hover:text-orange-500 cursor-pointer transition-colors">
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
  );
};
