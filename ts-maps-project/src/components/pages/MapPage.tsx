import React, { useState } from "react";
import SearchBar from "../../utils/SearchBar";
import SearchResults from "../../utils/SearchResults";
import KakaoMap from "../../utils/KaKaoMap";
import useKakaoLoader from "../../hooks/useKaKaoLoader";

export default function MapPage() {
  useKakaoLoader();

  const [keyword, setKeyword] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [roadviewPosition, setRoadviewPosition] = useState(null);
  const [isRoadviewVisible, setIsRoadviewVisible] = useState<boolean>(false); // 지도/로드뷰 상태

  const toggleRoadview = () => setIsRoadviewVisible((prev) => !prev);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "25%", padding: "10px", overflowY: "auto", height: "900px" }}>
        <SearchBar keyword={keyword} setKeyword={setKeyword} setSearchResults={setSearchResults} />
        <SearchResults
          results={searchResults}
          setRoadviewPosition={(position) => {
            setRoadviewPosition(position);
            setIsRoadviewVisible(true); // 검색 클릭 시 로드뷰 활성화
          }}
        />
        <button
          onClick={toggleRoadview}
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: isRoadviewVisible ? "#d9534f" : "#5bc0de",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {isRoadviewVisible ? "지도 보기" : "로드뷰 보기"}
        </button>
      </div>
      <div style={{ width: "75%" }}>
        <KakaoMap
          roadviewPosition={roadviewPosition}
          searchResults={searchResults}
          isRoadviewVisible={isRoadviewVisible}
        />
      </div>
    </div>
  );
}