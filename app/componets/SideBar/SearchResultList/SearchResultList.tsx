interface SearchResultListProps {
  places: any[];
  onPlaceClick: (place: any) => void;
}

const SearchResultList = ({ places, onPlaceClick }: SearchResultListProps) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-lg font-bold text-gray-700 mb-2">
        검색 결과 ({places.length})
      </h2>

      {places.length > 0 ? (
        places.map((place) => (
          <div
            key={place.id}
            onClick={() => onPlaceClick(place)}
            className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-orange-500 hover:shadow-md cursor-pointer transition-all group"
          >
            {/* 1. 이미지 영역 (썸네일) */}
            <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
              {place.place_url ? ( // 실제 데이터에 이미지 URL이 있다면 사용
                <img
                  src={`https://placehold.co/100x100?text=${place.place_name[0]}`} // 임시 이미지 (대체 가능)
                  alt={place.place_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300">
                  📷
                </div>
              )}
            </div>

            {/* 2. 텍스트 정보 영역 */}
            <div className="flex flex-col justify-between flex-1 py-1">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors line-clamp-1">
                    {place.place_name}
                  </h3>
                  {place.distance && (
                    <span className="flex-shrink-0 text-[10px] text-orange-400 bg-orange-50 px-2 py-1 rounded-lg">
                      {Math.round(place.distance / 100) / 10}km
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {place.category_name.split(" > ").pop()}{" "}
                  {/* 카테고리 마지막 댑스만 표시 */}
                </p>
              </div>

              <div className="mt-auto">
                <p className="text-[11px] text-gray-500 flex items-center">
                  <span className="mr-1 opacity-70">📍</span>
                  <span className="line-clamp-1">{place.address_name}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-20 text-center">
          <p className="text-3xl mb-4">🔍</p>
          <p className="text-sm text-gray-400">
            검색 결과가 없습니다.
            <br />
            다른 키워드로 검색해보세요!
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResultList;
