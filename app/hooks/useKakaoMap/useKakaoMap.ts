import { useRef, useState } from "react";

export const useKakaoMap = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const mapInstance = useRef<any>(null);
  const myLocationMarkerRef = useRef<any>(null);
  const myLocationOverlayRef = useRef<any>(null);
  const [places, setPlaces] = useState<any[]>([]);

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
    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      "맛집",
      (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
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
    mapInstance.current = new kakao.maps.Map(containerRef.current, {
      center: locPosition,
      level: 3,
    });
    displayMyLocation(locPosition);
    searchNearbyPlaces(lat, lon);
  };

  return { initMap, mapInstance: mapInstance.current, places };
};
