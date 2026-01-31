"use client";

import { useRef, useState, useEffect } from "react";
import Script from "next/script";
import { useKakaoMap } from "../hooks/useKakaoMap/useKakaoMap";
import { PlaceModal } from "../componets/PlaceModal/PlaceModal";
import { Sidebar } from "../componets/SideBar/sidebar";
import { StatusBar } from "../componets/StatusBar/StatusBar";
import { MatchingCreateSidebar } from "../componets/SideBar/MatchingCreateSidebar";
import { useActiveMatches } from "../hooks/useActiveMatches/useActiveMatches";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [sidebarMode, setSidebarMode] = useState<"HOME" | "CREATE">("HOME");
  const [isMatchingOpen, setIsMatchingOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const { initMap, places, mapInstance, markersRef } =
    useKakaoMap(mapContainer);
  const { activePlaceIds, refresh } = useActiveMatches();

  // 2. 사이드바 리스트 클릭 시 지도를 이동시키는 함수
  const handlePlaceClick = (place: any) => {
    if (!mapInstance) return;
    const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
    mapInstance.panTo(moveLatLon); // 부드럽게 이동
    setSelectedPlace(place); // 모달 띄우기
  };

  const handleStartMatching = () => {
    setSidebarMode("CREATE"); // 사이드바를 매칭 생성 모드로!
    setSelectedPlace(null); // 모달은 닫기
    // setIsMatchingOpen(true); // 이건 매칭이 '완료'된 후에 띄우는 게 흐름상 맞을 수도 있어요.
  };

  const handleMapLoad = () => {
    window.kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (p) => initMap(p.coords.latitude, p.coords.longitude),
          () => initMap(37.5665, 126.978),
        );
      }
    });
  };

  useEffect(() => {
    if (!mapInstance || places.length === 0) return;
    places.forEach((place) => {
      if (markersRef.current.has(place.id)) return;
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        map: mapInstance,
        position,
      });
      markersRef.current.set(place.id, marker);
      window.kakao.maps.event.addListener(marker, "click", () =>
        setSelectedPlace(place),
      );

      if (activePlaceIds.includes(place.id)) {
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
  }, [places, mapInstance, activePlaceIds]);

  return (
    // 3. 기존의 flex-col을 flex-row(기본값)로 바꾸고 h-screen을 줍니다.
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* 4. 사이드바 추가 (데이터와 클릭 함수 전달) */}
      {sidebarMode === "HOME" ? (
        <Sidebar places={places} onPlaceClick={handlePlaceClick} />
      ) : (
        <MatchingCreateSidebar
          place={selectedPlace} // 어떤 식당에 매칭을 만들지 정보 전달
          onBack={() => setSidebarMode("HOME")} // 뒤로가기 시 다시 홈으로
          onComplete={() => {
            setSidebarMode("HOME");
            setIsMatchingOpen(true); // 매칭 등록 완료 시 상단 바 띄우기
            refresh();
          }}
        />
      )}

      {/* 5. 지도 영역 (flex-1로 나머지 공간 꽉 채우기) */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="w-full h-full"></div>
        {isMatchingOpen && <StatusBar />}

        {/* 선택된 장소 모달 */}
        {selectedPlace && (
          <PlaceModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
            onStartMatching={handleStartMatching}
          />
        )}
      </div>

      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
        onLoad={handleMapLoad}
      />

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
    </div>
  );
}
