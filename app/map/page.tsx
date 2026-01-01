"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const MapContainer = useRef(null);
  const MapInstance = useRef(null);

  const initMap = () => {
    console.log("initMap 함수 시작!");
    if (window.kakao && MapContainer.current) {
      console.log("카카오 객체와 컨테이너 준비 완료");
      const kakao = window.kakao;

      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 시청 기준
        level: 3,
      };

      // 지도 인스턴스를 ref에 저장 (나중에 식당 검색 시 사용)
      MapInstance.current = new kakao.maps.Map(MapContainer.current, options);

      // 마커 하나 생성 (예시)
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.5665, 126.978),
      });
      marker.setMap(MapInstance.current);
    }
  };
  console.log(process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);
  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* 1. 지도 컨테이너 - 테일윈드 적용 */}
      <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-lg border border-gray-200">
        <div
          id="map"
          ref={MapContainer}
          className="w-full h-[400px] md:h-[600px]" // 모바일 400px, 데스크톱 600px
        ></div>
      </div>

      {/* 2. 카카오 지도 SDK 로드 */}
      {/* libraries=services 를 붙여야 나중에 '식당 검색' 기능을 쓸 수 있습니다 */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
        onLoad={() => {
          window.kakao.maps.load(initMap);
        }}
      />
      <p className="mt-4 text-sm text-gray-500 font-medium">
        📍 EatBuddy가 현재 위치 주변 맛집을 찾고 있어요!
      </p>
    </div>
  );
}
