"use client";

import { useRef, useState, useEffect } from "react";
import Script from "next/script";
import { useKakaoMap } from "../hooks/useKakaoMap/useKakaoMap";
import { PlaceModal } from "../componets/PlaceModal/PlaceModal";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const { initMap, places, mapInstance } = useKakaoMap(mapContainer);

  const handleMapLoad = () => {
    window.kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (p) => initMap(p.coords.latitude, p.coords.longitude),
          () => initMap(37.5665, 126.978)
        );
      }
    });
  };

  useEffect(() => {
    if (!mapInstance || places.length === 0) return;

    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        map: mapInstance,
        position,
      });

      window.kakao.maps.event.addListener(marker, "click", () =>
        setSelectedPlace(place)
      );

      if (parseInt(place.id) % 2 === 0) {
        const content = document.createElement("div");
        content.className = "relative flex items-center justify-center";
        content.innerHTML = `
          <div class="marker-light"></div>
          <div style="position: relative; background: #f97316; color: white; font-size: 10px; font-weight: bold; padding: 2px 5px; border-radius: 10px; bottom: 40px; white-space: nowrap; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">🔥 매칭중</div>
        `;
        new window.kakao.maps.CustomOverlay({
          position,
          map: mapInstance,
          content,
          yAnchor: 1,
        });
      }
    });
  }, [places, mapInstance]);

  return (
    <div className="flex flex-col items-center w-full p-4 bg-gray-50 min-h-screen relative">
      <style jsx global>{`
        .marker-light {
          position: absolute;
          width: 40px;
          height: 40px;
          background: rgba(249, 115, 22, 0.4);
          border-radius: 50%;
          animation: pulse 2s infinite;
          bottom: 15px;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>

      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-orange-500 italic">
          EatBuddy
        </h1>
        <p className="text-gray-600 font-medium">
          마커를 클릭해 메뉴와 리뷰를 확인하세요!
        </p>
      </div>

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl border-8 border-white bg-white">
        <div ref={mapContainer} className="w-full h-[500px] md:h-[700px]"></div>
      </div>

      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}

      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
        onLoad={handleMapLoad}
      />
    </div>
  );
}
