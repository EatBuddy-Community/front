import { FavoriteItem } from "./FavoriteItem";

export interface Restaurant {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  image?: string; // 선택 사항
}

interface FavoriteSectionProps {
  favorites: Restaurant[];
}

export const FavoriteSection = ({ favorites }: FavoriteSectionProps) => {
  return (
    <section>
      <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        ⭐ 내가 찜한 맛집
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {favorites.map((item) => (
          <FavoriteItem key={item.id} restaurant={item} />
        ))}
      </div>
    </section>
  );
};
