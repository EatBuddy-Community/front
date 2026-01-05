import { useRef, useState } from "react";

export const useKakaoMap = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const mapInstance = useRef<any>(null);
  const myLocationMarkerRef = useRef<any>(null);
  const myLocationOverlayRef = useRef<any>(null);
  const [places, setPlaces] = useState<any[]>([]);

  const placeCache = useRef(new Map<string, any[]>()); // 캐시 저장소
  const generateKey = (lat: number, lng: number) => {
    const precision = 3;
    return `${lat.toFixed(precision)}_${lng.toFixed(precision)}`;
  }; // 소수점 3째 자리까지 끊으면 약 100m 단위의 격자가 생성 캐싱 범위를 조절

  // 내 위치 표시
  const displayMyLocation = (position: any) => {
    const kakao = window.kakao;
    if (myLocationMarkerRef.current) myLocationMarkerRef.current.setMap(null);
    if (myLocationOverlayRef.current) myLocationOverlayRef.current.setMap(null);

    const markerImage = new kakao.maps.MarkerImage(
      "/marker.png",
      new kakao.maps.Size(90, 90),
      { offset: new kakao.maps.Point(25, 50) }
    );

    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
      map: mapInstance.current,
      zIndex: 10,
    });

    const overlay = new kakao.maps.CustomOverlay({
      content: `<div style="background: #3b82f6; color: white; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.2); border: 2px solid white; bottom: 38px; position: relative;">내 위치</div>`,
      position,
      map: mapInstance.current,
      yAnchor: 1,
    });

    myLocationMarkerRef.current = marker;
    myLocationOverlayRef.current = overlay;
  };

  // 장소 검색
  const searchNearbyPlaces = (lat: number, lon: number) => {
    const key = generateKey(lat, lon);

    if (placeCache.current.has(key)) {
      const cachedData = placeCache.current.get(key) || [];

      setPlaces((prev) => {
        // 기존 데이터(prev)와 캐시 데이터(cachedData)를 합친 뒤 중복 제거
        const combined = [...prev, ...cachedData];
        return combined.filter(
          (place, index, self) =>
            index === self.findIndex((p) => p.id === place.id)
        );
      });
      return;
    }

    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      "맛집",
      (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          if (placeCache.current.size > 30) {
            // Map의 특성을 이용해 가장 오래된(맨 처음 저장된) 키를 찾아 삭제
            const oldestKey = placeCache.current.keys().next().value;
            if (oldestKey) {
              placeCache.current.delete(oldestKey);
            }
          }
          // 캐시에 저장
          placeCache.current.set(key, data);

          setPlaces((prev) => {
            const combined = [...prev, ...data];
            return combined.filter(
              (place, index, self) =>
                index === self.findIndex((p) => p.id === place.id)
            );
          });
        }
      },
      {
        location: new kakao.maps.LatLng(lat, lon),
        radius: 2000,
        category_group_code: "FD6",
      }
    );
  };

  const initMap = (lat: number, lon: number) => {
    if (!containerRef.current) return;
    const kakao = window.kakao;
    const locPosition = new kakao.maps.LatLng(lat, lon);
    const map = new kakao.maps.Map(containerRef.current, {
      center: locPosition,
      level: 3,
    });
    mapInstance.current = map;

    kakao.maps.event.addListener(map, "idle", () => {
      const center = map.getCenter();
      const newLat = center.getLat();
      const newLng = center.getLng();

      searchNearbyPlaces(newLat, newLng);
    });

    displayMyLocation(locPosition);
    searchNearbyPlaces(lat, lon);
  };

  return { initMap, mapInstance: mapInstance.current, places };
};
