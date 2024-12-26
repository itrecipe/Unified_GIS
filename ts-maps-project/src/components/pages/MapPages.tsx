import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker, MapTypeControl, MapTypeId, Roadview, RoadviewMarker, ZoomControl } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKaKaoLoader";
import AddMapCustomControlStyle from "../../styles/addMapCustomControl.style";

export default function MapPages() {
  useKakaoLoader();

  // 로드뷰 & 지도 토글 상태
  const [toggle, setToggle] = useState("map")

  
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // 지도 객체 저장
  const mapRef = useRef<kakao.maps.Map | null>(null); // useRef 활성화
  const [markers, setMarkers] = useState<any[]>([]); // 마커 저장
  const [keyword, setKeyword] = useState<string>(""); // 검색 키워드
  const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과 저장
  const [roadviewPosition, setRoadviewPosition] = useState<kakao.maps.LatLng | null>(null); // 로드뷰의 위치
  
  const placePosition = new kakao.maps.LatLng(33.450701, 125.570667);

  
  // 검색 결과에서 클릭시 로드뷰 위치 업데이트
  const handleSearchResultClick = (result: any) => {
    const latLng = new kakao.maps.LatLng(parseFloat(result.y), parseFloat(result.x));
    map?.setCenter(latLng);
    setRoadviewPosition(latLng);
  }

  const handleSearch = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    // 키워드 검색 수행
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = data.map((place: any) => ({
          position: {
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
          },
          content: place.place_name,
        }));
        setMarkers(newMarkers);
        setSearchResults(data);

        // 지도 범위를 검색 결과에 맞게 조정
        data.forEach((place: any) => {
          bounds.extend(new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)));
        });
        map.setBounds(bounds);
      }
    });
  };

  useEffect(() => {
    if (mapRef.current) {
      setMap(mapRef.current);
    }
  }, [mapRef]);

  return (
    <>
      <AddMapCustomControlStyle />
        <div style={{ display: "flex" }}>
          {/* 검색 결과 목록 영역 */}
          <div style={{ width: "25%", padding: "10px", overflowY: "auto", height: "900px" }}>
            <h3>검색 결과</h3>
            <input
              type="text"
              placeholder="키워드를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // Enter 키 입력 시 검색을 실행
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
                  key={index}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const latLng = new kakao.maps.LatLng(parseFloat(result.y), parseFloat(result.x))
                    map?.setCenter(latLng);
                    setRoadviewPosition(latLng) // 로드뷰의 위치를 업데이트
                  }}
                >
                  {result.place_name}
                </li>
              ))}
            </ul>
          </div>

          {/* 지도 영역 */}
          <div style={{ width: "75%" }}>
            {toggle === "map" && (
              <Map
                id="map"
                center={{ lat: 37.566826, lng: 126.9786567 }}
                style={{ width: "100%", height: "900px" }}
                level={3}
                ref={mapRef}
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
                <RoadviewMarker position={placePosition} />
              </Roadview>
            )}

            {/* 지도와 로드뷰를 전환할 버튼 */}
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