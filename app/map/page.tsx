"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const MapContainer = useRef<HTMLDivElement>(null);
  const MapInstance = useRef<any>(null);

  const initMap = () => {
    if (window.kakao && MapContainer.current) {
      const kakao = window.kakao;

      // 1. 현재 내 위치(GPS) 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude; // 위도
            const lon = position.coords.longitude; // 경도
            const locPosition = new kakao.maps.LatLng(lat, lon);

            const options = {
              center: locPosition,
              level: 3,
            };

            const map = new kakao.maps.Map(MapContainer.current, options);
            MapInstance.current = map;

            // 내 위치에 특별한 마커 표시 (옵션)
            const centerMarker = new kakao.maps.Marker({
              position: locPosition,
              map: map,
              image: new kakao.maps.MarkerImage(
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                new kakao.maps.Size(24, 35)
              ),
            });

            // 2. 주변 식당 검색 실행
            searchPlaces(lat, lon);
          },
          (error) => {
            console.error("위치 정보를 가져오지 못했습니다.", error);
            // 위치 권한 거부 시 기본 좌표(서울시청)로 실행
            startWithDefaultLocation();
          }
        );
      } else {
        startWithDefaultLocation();
      }
    }
  };

  // 기본 좌표로 시작하는 함수
  const startWithDefaultLocation = () => {
    const defaultLat = 37.5665;
    const defaultLon = 126.978;
    const locPosition = new window.kakao.maps.LatLng(defaultLat, defaultLon);
    const map = new window.kakao.maps.Map(MapContainer.current, {
      center: locPosition,
      level: 3,
    });
    MapInstance.current = map;
    searchPlaces(defaultLat, defaultLon);
  };

  // 식당 검색 함수
  const searchPlaces = (lat: number, lon: number) => {
    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      "맛집",
      (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
          }
        }
      },
      {
        location: new kakao.maps.LatLng(lat, lon),
        radius: 2000,
        category_group_code: "FD6",
      }
    );
  };

  // 마커 표시 및 인포윈도우 함수
  const displayMarker = (place: any) => {
    const kakao = window.kakao;
    const marker = new kakao.maps.Marker({
      map: MapInstance.current,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    kakao.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(
        `<div class="p-2 text-xs font-sans">
          <strong class="text-orange-600">${place.place_name}</strong><br/>
          <span class="text-gray-500">${place.category_name
            .split(" > ")
            .pop()}</span>
        </div>`
      );
      infowindow.open(MapInstance.current, marker);
    });
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-gray-50 min-h-screen">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-orange-500 mb-2 italic">
          EatBuddy
        </h1>
        <p className="text-gray-600">내 주변의 숨은 맛집을 찾아보세요!</p>
      </div>

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl border-8 border-white">
        <div
          id="map"
          ref={MapContainer}
          className="w-full h-[500px] md:h-[700px]"
        ></div>
      </div>

      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
    </div>
  );
}
