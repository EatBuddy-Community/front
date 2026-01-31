import { useState, useEffect } from "react";

export const useActiveMatches = () => {
  const [activePlaceIds, setActivePlaceIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivePlaces = async () => {
    try {
      // 나중에 환경변수로 바꾸기 편하게 URL 관리
      const response = await fetch(
        "http://localhost:4000/matches/active-places",
      );
      if (!response.ok) throw new Error("네트워크 응답에 문제가 있습니다.");

      const data = await response.json();
      setActivePlaceIds(data);
    } catch (error) {
      console.error("매칭 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivePlaces();

    // 선택 사항: 30초마다 자동으로 새로고침하고 싶다면?
    // const timer = setInterval(fetchActivePlaces, 30000);
    // return () => clearInterval(timer);
  }, []);

  // 데이터를 수동으로 새로고침하고 싶을 때를 위해 리프레시 함수도 내보냅니다.
  return { activePlaceIds, loading, refresh: fetchActivePlaces };
};
