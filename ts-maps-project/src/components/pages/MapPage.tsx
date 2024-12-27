import React, { useState } from "react";
import SearchBar from "../common/SearchBar";
import SearchResults from "../common/SearchResults";
import KakaoMap from "../common/KaKaoMap";
import useKakaoLoader from "../../hooks/useKaKaoLoader";

export default function MapPage() {
  useKakaoLoader();

  const [keyword, setKeyword] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [roadviewPosition, setRoadviewPosition] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "25%", padding: "10px", overflowY: "auto", height: "900px" }}>
        <SearchBar keyword={keyword} setKeyword={setKeyword} setSearchResults={setSearchResults} />
        <SearchResults results={searchResults} setRoadviewPosition={setRoadviewPosition} />
      </div>
      <div style={{ width: "75%" }}>
        <KakaoMap roadviewPosition={roadviewPosition} searchResults={searchResults} />
      </div>
    </div>
  );
}
