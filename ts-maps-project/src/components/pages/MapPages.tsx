import React, { useState } from "react";
import {
  Map,
  MapMarker,
  MapTypeControl,
  MapTypeId,
  Roadview,
  RoadviewMarker,
  ZoomControl,
} from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKaKaoLoader";
import AddMapCustomControlStyle from "../../styles/addMapCustomControl.style";

// 장소 데이터 타입 정의
interface Place {
  id: string;
  place_name: string;
  x: string;
  y: string;
}

export default function MapPages() {
  useKakaoLoader();

  const [toggle, setToggle] = useState<"map" | "roadview">("map");
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<{ position: { lat: number; lng: number }; content: string }[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [roadviewPosition, setRoadviewPosition] = useState<{ lat: number; lng: number; radius: number } | null>(null);

  // 검색 결과에서 클릭 시 로드뷰 위치 업데이트
  const handleSearchResultClick = (result: Place) => {
    const latLng = new kakao.maps.LatLng(parseFloat(result.y), parseFloat(result.x));
    map?.setCenter(latLng);
    setRoadviewPosition({
      lat: latLng.getLat(),
      lng: latLng.getLng(),
      radius: 50,
    });
  };

  // 키워드 검색 핸들러
  const handleSearch = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = data.map((place: Place) => ({
          position: {
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
          },
          content: place.place_name,
        }));
        setMarkers(newMarkers);
        setSearchResults(data);

        data.forEach((place: Place) => {
          bounds.extend(new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)));
        });
        map.setBounds(bounds);
      }
    });
  };

  return (
    <>
      <AddMapCustomControlStyle />
      <div style={{ display: "flex" }}>
        <div style={{ width: "25%", padding: "10px", overflowY: "auto", height: "900px" }}>
          <h3>검색 결과</h3>
          <input
            type="text"
            placeholder="키워드를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              backgroundColor: "#425470",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            검색
          </button>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {searchResults.map((result, index) => (
              <li
                key={result.id || index}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => handleSearchResultClick(result)}
              >
                {result.place_name}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ width: "75%" }}>
          {toggle === "map" && (
            <Map
              id="map"
              center={{ lat: 37.566826, lng: 126.9786567 }}
              style={{ width: "100%", height: "900px" }}
              level={3}
              onCreate={setMap}
            >
              {markers.map((marker, index) => (
                <MapMarker
                  key={index}
                  position={marker.position}
                  onClick={() => alert(marker.content)}
                >
                  <div style={{ color: "#000" }}>{marker.content}</div>
                </MapMarker>
              ))}
              <MapTypeId type={"TRAFFIC"} />
              <MapTypeControl position={"TOPRIGHT"} />
              <ZoomControl position={"RIGHT"} />
            </Map>
          )}
          {toggle === "roadview" && roadviewPosition && (
            <Roadview
              position={roadviewPosition}
              style={{
                width: "100%",
                height: "900px",
              }}
            >
              <RoadviewMarker position={roadviewPosition} />
            </Roadview>
          )}
          <input
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 10,
            }}
            type="button"
            onClick={() => setToggle(toggle === "map" ? "roadview" : "map")}
            title={toggle === "map" ? "로드뷰 보기" : "지도 보기"}
            value={toggle === "map" ? "로드뷰" : "지도"}
          />
        </div>
      </div>
    </>
  );
}
