import React from "react";
import {
  Map,
  MapMarker,
  Roadview,
  RoadviewMarker,
  ZoomControl,
  MapTypeControl,
  MapTypeId,
  MapInfoWindow,
} from "react-kakao-maps-sdk";

interface KakaoMapProps {
  roadviewPosition: { lat: number; lng: number; radius: number } | null;
  searchResults: any[];
  isRoadviewVisible: boolean; // 로드뷰 & 지도 상태 추가
}

export default function KakaoMap({
  roadviewPosition,
  searchResults,
  isRoadviewVisible,
}: KakaoMapProps) {
  return isRoadviewVisible && roadviewPosition ? (
    <Roadview
      position={roadviewPosition}
      style={{ width: "100%", height: "900px" }}
    >
      <RoadviewMarker position={roadviewPosition} />
    </Roadview>
  ) : (
    <Map
      center={{ lat: 37.566826, lng: 126.9786567 }}
      style={{ width: "100%", height: "900px" }}
      level={3}
    >
      <MapInfoWindow // 인포윈도우 생성 및 지도에 표시
        position={{
          // 인포 윈도우가 표시될 위치
          lat: 33.450701,
          lng: 126.570667,
        }}
        removable={true} // removeable 속성을 true로 설정하면 인포 윈도우를 닫을 수 있는 x버튼이 활성화됨
      >
        <div style={{ padding: "5px", color: "#000" }}>Hello World!</div>
      </MapInfoWindow>

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

      {/* 지도에 교통 정보를 표시하도록 지도 타입 추가 */}
      <MapTypeId type={"TRAFFIC"} />

      {/* 지도에 로드뷰 정보가 있는 도로를 표시하기 위해 지도 타입 추가 */}
      <MapTypeId type={"ROADVIEW"} />

      {/* 지도에 지형 정보를 표시 하도록 지도 타입 추가 */}
      <MapTypeId type={"TERRAIN"} />

      <ZoomControl position="RIGHT" />
      <MapTypeControl position="TOPRIGHT" />
    </Map>
  );
}
