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
            className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-orange-500 hover:shadow-md cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                {place.place_name}
              </h3>
              {place.distance && (
                <span className="text-[10px] text-orange-400 bg-orange-50 px-2 py-1 rounded-lg">
                  {Math.round(place.distance / 100) / 10}km
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
              {place.category_name}
            </p>
            <p className="text-[11px] text-gray-400 mt-2 flex items-center">
              <span className="mr-1">📍</span>
              {place.address_name}
            </p>
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
