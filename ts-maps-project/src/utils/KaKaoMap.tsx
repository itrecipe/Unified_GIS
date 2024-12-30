import React from "react";
import { Map, MapMarker, Roadview, RoadviewMarker, ZoomControl, MapTypeControl } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  roadviewPosition: { lat: number; lng: number; radius: number } | null;
  searchResults: any[];
  isRoadviewVisible: boolean; // 로드뷰 & 지도 상태 추가
}

export default function KakaoMap({ roadviewPosition, searchResults, isRoadviewVisible }: KakaoMapProps) {
  return isRoadviewVisible && roadviewPosition ? (
    <Roadview position={roadviewPosition} style={{ width: "100%", height: "900px" }}>
      <RoadviewMarker position={roadviewPosition} />
    </Roadview>
  ) : (
    <Map center={{ lat: 37.566826, lng: 126.9786567 }} style={{ width: "100%", height: "900px" }} level={3}>
      {searchResults.map((result, index) => (
        <MapMarker
          key={index}
          position={{
            lat: parseFloat(result.y),
            lng: parseFloat(result.x),
          }}
        >
          <div style={{ color: "#000" }}>{result.place_name}</div>
        </MapMarker>
      ))}
      <ZoomControl position="RIGHT" />
      <MapTypeControl position="TOPRIGHT" />
    </Map>
  );
}