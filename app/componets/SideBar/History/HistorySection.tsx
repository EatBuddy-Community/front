import { HistoryItem } from "./HistoryItem";

const HistorySection = () => {
  // 히스토리 데이터 배열
  const historyData = [
    {
      id: 1,
      isLatest: true,
      date: "TODAY",
      content: "성수동 갓잇 매칭 참여 신청",
    },
    {
      id: 2,
      isLatest: false,
      date: "2 DAYS AGO",
      content: "진미 평양냉면 방문 완료",
    },
  ];

  return (
    <section className="p-4">
      <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        🕒 최근 내 활동
      </h2>

      {/* 타임라인 세로 줄기 */}
      <div className="relative pl-4 border-l-2 border-orange-100 space-y-6 ml-1">
        {historyData.map((item) => (
          <HistoryItem
            key={item.id}
            isLatest={item.isLatest}
            date={item.date}
            content={item.content}
          />
        ))}
      </div>
    </section>
  );
};

export default HistorySection;
