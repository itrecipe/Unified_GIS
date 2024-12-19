import React, { useEffect, useRef, useState } from "react";

// window.kakao 객체 타입 선언
declare global {
  interface Window {
    kakao: any; // kakao 객체를 any로 선언해서 모든 프로퍼티에 접근할 수 있게 함
  }
}

const App: React.FC = () => {
  const [keyword, setKeyword] = useState<string>(""); // 검색 키워드 상태 관리
  const mapRef = useRef<kakao.maps.Map | null>(null); // 지도 객체를 참조할 ref

  useEffect(() => {
    // 카카오맵 API 스크립트 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=5c2a70ba02a0890f8aa40c6b6cb79dae&libraries=services&autoload=true`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        console.log("카카오맵 API 로드 성공");

        // 카카오맵 API 로드 후 지도 생성
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);
          mapRef.current = map;

          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

          const position = new window.kakao.maps.LatLng(33.450701, 126.570667);
          const marker = new window.kakao.maps.Marker({ position });
          marker.setMap(map);
        });
      } else {
        console.error("카카오맵 API를 로드하지 못했습니다.");
      }
    };

    script.onerror = () => {
      console.error("카카오맵 API 스크립트를 로드하는 중 오류가 발생했습니다.");
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSearch = () => {
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data, status) => {
        console.log("검색 상태 : ", status);
        if (status === window.kakao.maps.services.Status.OK) {
          const firstPlace = data[0];
          const center = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);

          // 지도 중심 이동 및 마커 추가
          if (mapRef.current) {
            mapRef.current.setCenter(center); // 지도 중심을 검색된 위치로 변경
            const marker = new window.kakao.maps.Marker({ position: center });
            marker.setMap(mapRef.current); // 지도에 마커 추가
          }
        } else {
          alert("검색 결과가 없습니다.");
        }
      });
    } else {
      alert("카카오맵 API 또는 'places' 서비스가 로드되지 않았습니다.");
    }
  };

  return (
    <div>
      <h1>Kakao Map Service</h1>

      {/* 검색어 입력창 */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} // 입력된 값 상태 업데이트
        placeholder="장소를 입력하세요"
      />
      {/* 검색 버튼 */}
      <button onClick={handleSearch}>검색</button>
      
      {/* 지도 표시 영역 */}
      <div id="map" style={{ width: "1000px", height: "800px" }} />
    </div>
  );
};

export default App;
