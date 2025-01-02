import React from "react";

// SearchResultsProps : SearchResults 컴포넌트가 받을 속성들의 타입 정의
interface SearchResultsProps {
  results: any[]; // 검색 결과 목록
  // 로드뷰 위치를 설정하는 함수
  setRoadviewPosition: (position: {
    lat: number;
    lng: number;
    radius: number;
  }) => void;
}

// 검색 결과 리스트를 렌더링하는 컴포넌트
export default function SearchResults({
  results,
  setRoadviewPosition,
}: SearchResultsProps) {
  // 검색 결과를 클릭했을 때 실행되는 함수
  const handleResultClick = (result: any) => {
    // 카카오 지도 API에서 사용할 LatLng 객체 생성
    const latLng = new kakao.maps.LatLng(
      parseFloat(result.y), // 검색 결과의 위도 (문자열을 숫자로 변환)
      parseFloat(result.x) // 검색 결과의 경도 (문자열을 숫자로 변환)
    );

    // 로드뷰 위치 상태 업데이트
    setRoadviewPosition({
      lat: latLng.getLat(), // 위도 값 가져옴
      lng: latLng.getLng(), // 경도 값 가져옴
      radius: 50, // 로드뷰 반경 설정
    });
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {/* 검색 결과 배열을 순회하며 리스트 항목으로 렌더링 */}
      {results.map((result, index) => (
        <li
          key={result.id || index} // 각 리스트 항목의 고유 키
          style={{
            padding: "10px", // 리스트 항목 내부 여백
            borderBottom: "1px solid #ccc", // 항목 간 구분선
            cursor: "pointer", // 마우스를 올리면 클릭 가능한 포인터 표시
          }}
          onClick={() => handleResultClick(result)} // 클릭 시 헨들러 실행
        >
          {result.place_name} {/* 검색 결과 장소명 표시 */}
        </li>
      ))}
    </ul>
  );
}