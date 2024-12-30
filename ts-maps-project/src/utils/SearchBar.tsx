import React, { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setSearchResults: Dispatch<SetStateAction<any[]>>;
}

export default function SearchBar({ keyword, setKeyword, setSearchResults }: SearchBarProps) {
  const handleSearch = () => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(data);
      }
    });
  };

  return (
    <>
      <input
        type="text"
        placeholder="키워드를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
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
    </>
  );
}