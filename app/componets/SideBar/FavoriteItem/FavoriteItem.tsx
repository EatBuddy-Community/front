import { Restaurant } from "./FavoriteSection";

interface FavoriteItemProps {
  restaurant: Restaurant;
}

export const FavoriteItem = ({ restaurant }: FavoriteItemProps) => (
  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-gray-100">
    {/* 이미지 영역 */}
    <div className="w-14 h-14 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
      {restaurant.image && (
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      )}
    </div>

    {/* 텍스트 정보 */}
    <div>
      <h4 className="text-sm font-bold text-gray-800">{restaurant.name}</h4>
      <p className="text-[11px] text-gray-400">
        {restaurant.category} · {restaurant.location}
      </p>
      <p className="text-[11px] text-orange-500 font-bold">
        ★ {restaurant.rating} (리뷰 {restaurant.reviewCount})
      </p>
    </div>
  </div>
);
