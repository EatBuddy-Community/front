"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const MapContainer = useRef<HTMLDivElement>(null);
  const MapInstance = useRef<any>(null);

  // [추가] 내 위치 마커와 라벨을 관리하기 위한 Ref (중복 생성 방지)
  const myLocationMarkerRef = useRef<any>(null);
  const myLocationOverlayRef = useRef<any>(null);

  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const initMap = () => {
    if (window.kakao && MapContainer.current) {
      const kakao = window.kakao;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locPosition = new kakao.maps.LatLng(lat, lon);
            const options = { center: locPosition, level: 3 };
            const map = new kakao.maps.Map(MapContainer.current, options);
            MapInstance.current = map;

            // [추가] 내 위치 마커 표시
            displayMyLocation(locPosition);
            searchPlaces(lat, lon);
          },
          () => startWithDefaultLocation()
        );
      } else {
        startWithDefaultLocation();
      }
    }
  };

  // [추가] 내 위치 커스텀 마커 함수
  const displayMyLocation = (position: any) => {
    const kakao = window.kakao;
    if (myLocationMarkerRef.current) myLocationMarkerRef.current.setMap(null);
    if (myLocationOverlayRef.current) myLocationOverlayRef.current.setMap(null);

    const imageSrc = "/marker.png";
    const imageSize = new kakao.maps.Size(90, 90); // 마커 크기 (적절히 조절하세요)
    const imageOption = { offset: new kakao.maps.Point(25, 50) }; // 마커의 좌표와 일치시킬 이미지 안의 지점

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
      map: MapInstance.current,
      zIndex: 10,
    });

    const content = `
      <div style="
        background: #3b82f6;
        color: white;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: bold;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        border: 2px solid white;
        bottom: 38px;
        position: relative;
      ">내 위치</div>`;

    const overlay = new kakao.maps.CustomOverlay({
      content: content,
      position,
      map: MapInstance.current,
      yAnchor: 1,
    });

    myLocationMarkerRef.current = marker;
    myLocationOverlayRef.current = overlay;
  };

  const startWithDefaultLocation = () => {
    const defaultLat = 37.5665;
    const defaultLon = 126.978;
    const locPosition = new window.kakao.maps.LatLng(defaultLat, defaultLon);
    const map = new window.kakao.maps.Map(MapContainer.current, {
      center: locPosition,
      level: 3,
    });
    MapInstance.current = map;
    displayMyLocation(locPosition); // [추가]
    searchPlaces(defaultLat, defaultLon);
  };

  const searchPlaces = (lat: number, lon: number) => {
    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      "맛집",
      (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          data.forEach((place: any) => displayMarker(place));
        }
      },
      {
        location: new kakao.maps.LatLng(lat, lon),
        radius: 2000,
        category_group_code: "FD6",
      }
    );
  };

  const displayMarker = (place: any) => {
    const kakao = window.kakao;
    const position = new kakao.maps.LatLng(place.y, place.x);

    const marker = new kakao.maps.Marker({
      map: MapInstance.current,
      position: position,
    });

    const hasWaitingBuddies = parseInt(place.id) % 2 === 0;

    if (hasWaitingBuddies) {
      const content = document.createElement("div");
      content.className = "relative flex items-center justify-center";
      content.innerHTML = `
        <div class="marker-light"></div>
        <div style="
          position: relative;
          background: #f97316;
          color: white;
          font-size: 10px;
          font-weight: bold;
          padding: 2px 5px;
          border-radius: 10px;
          bottom: 40px;
          white-space: nowrap;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        ">
          🔥 매칭중
        </div>
      `;

      new kakao.maps.CustomOverlay({
        content: content,
        map: MapInstance.current,
        position: position,
        yAnchor: 1,
      });
    }

    kakao.maps.event.addListener(marker, "click", () => {
      setSelectedPlace(place);
    });
  };

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
        <h1 className="text-3xl font-extrabold text-orange-500 mb-2 italic text-shadow">
          EatBuddy
        </h1>
        <p className="text-gray-600 font-medium">
          마커를 클릭해 메뉴와 리뷰를 확인하세요!
        </p>
      </div>

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl border-8 border-white bg-white">
        <div
          id="map"
          ref={MapContainer}
          className="w-full h-[500px] md:h-[700px]"
        ></div>
      </div>

      {/* 모달 UI (사용자님의 원본 디자인 그대로 유지) */}
      {selectedPlace && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b flex justify-between items-center bg-orange-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedPlace.place_name}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedPlace.category_name}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlace(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <iframe
                src={selectedPlace.place_url.replace("http://", "https://")}
                className="w-full h-[600px] border-none"
              ></iframe>
            </div>

            <div className="p-4 bg-gray-50 border-t flex flex-col gap-3">
              <div className="flex items-center justify-between px-2 text-sm text-gray-500 font-medium">
                <span>
                  현재 이 식당 주변에 <strong>5명</strong>의 버디가 있어요!
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    alert(
                      `${selectedPlace.place_name}에서 밥친구 매칭을 시작합니다!`
                    );
                  }}
                  className="flex-[2] bg-orange-500 text-white text-center py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all active:scale-95"
                >
                  🍚 함께 먹을 버디 찾기 (매칭)
                </button>

                <a
                  href={selectedPlace.place_url}
                  target="_blank"
                  className="flex-1 bg-white text-gray-400 text-center py-4 rounded-2xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors text-sm flex items-center justify-center"
                >
                  상세정보
                </a>
              </div>

              <div className="p-5 bg-orange-50 border-b border-orange-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                  <h3 className="font-bold text-gray-800">
                    현재 대기 중인 버디
                  </h3>
                </div>

                <div className="flex -space-x-3 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-xs font-bold text-white overflow-hidden"
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
      )}

      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
    </div>
  );
}
