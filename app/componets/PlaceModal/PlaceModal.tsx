interface PlaceModalProps {
  place: any;
  onClose: () => void;
  onStartMatching?: () => void;
}

export const PlaceModal = ({
  place,
  onClose,
  onStartMatching,
}: PlaceModalProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* 헤더 */}
        <div className="p-5 border-b flex justify-between items-center bg-orange-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {place.place_name}
            </h2>
            <p className="text-xs text-gray-500 mt-1">{place.category_name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-all"
          >
            ✕
          </button>
        </div>

        {/* 상세정보 Iframe */}
        <div className="flex-1 overflow-y-auto">
          <iframe
            src={place.place_url.replace("http://", "https://")}
            className="w-full h-[600px] border-none"
          ></iframe>
        </div>

        {/* 하단 영역 (버디 정보 포함) */}
        <div className="p-4 bg-gray-50 border-t flex flex-col gap-3">
          <div className="flex items-center justify-between px-2 text-sm text-gray-500 font-medium">
            <span>
              현재 이 식당 주변에 <strong>5명</strong>의 버디가 있어요!
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                if (onStartMatching) {
                  onStartMatching();
                }
              }}
              className="flex-[2] bg-orange-500 text-white text-center py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 shadow-lg transition-all active:scale-95"
            >
              🍚 함께 먹을 버디 찾기 (매칭)
            </button>
            <a
              href={place.place_url}
              target="_blank"
              className="flex-1 bg-white text-gray-400 text-center py-4 rounded-2xl font-medium border border-gray-200 hover:bg-gray-50 text-sm flex items-center justify-center"
            >
              상세정보
            </a>
          </div>

          {/* 대기 중인 버디 목록 */}
          <div className="p-5 bg-orange-50 border-b border-orange-100 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <h3 className="font-bold text-gray-800">현재 대기 중인 버디</h3>
            </div>
            <div className="flex -space-x-3 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="buddy"
                  />
                </div>
              ))}
              <div className="flex items-center justify-center h-10 px-3 rounded-full bg-white text-orange-600 text-xs font-bold ring-2 ring-white shadow-sm">
                +2명 더 대기 중!
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              지금 매칭하면 5분 내로 연결될 확률이 높아요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
