import React from "react";

interface SearchResultsProps {
    results: any[];
    setRoadviewPosition: (position: { lat: number; lng: number; radius: number }) => void;
}

// 검색 결과 리스트 컴포넌트
export default function SearchResults({ results, setRoadviewPosition }: SearchResultsProps) {
  const handleResultClick = (result: any) => {
    const latLng = new kakao.maps.LatLng(parseFloat(result.y), parseFloat(result.x));
    setRoadviewPosition({
      lat: latLng.getLat(),
      lng: latLng.getLng(),
      radius: 50,
    });
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {results.map((result, index) => (
        <li
          key={result.id || index}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={() => handleResultClick(result)}
        >
          {result.place_name}
        </li>
      ))}
    </ul>
  );
}