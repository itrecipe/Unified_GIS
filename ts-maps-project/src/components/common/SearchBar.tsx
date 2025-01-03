import React, { Dispatch, SetStateAction } from "react";

// SearchBarProps: SearchBar 컴포넌트가 받을 속성들의 타입 정의
interface SearchBarProps {
  keyword: string; // 현재 검색 키워드
  setKeyword: Dispatch<SetStateAction<string>>; // 키워드를 업뎃하는 상태 변경 함수
  setSearchResults: Dispatch<SetStateAction<any[]>>; // 검색 결과를 업뎃하는 상태 변경 함수
}

// SearchBar 컴포넌트 : 사용자가 키워드를 입력하고 검색 버튼을 눌러 장소를 검색
export default function SearchBar({ keyword, setKeyword, setSearchResults }: SearchBarProps) {
  // handleSearch : 카카오 지도 API를 사용해 키워드로 장소 검색
  const handleSearch = () => {
    const ps = new kakao.maps.services.Places(); // 카카오 지도 API의 places 서비스를 초기화
    ps.keywordSearch(keyword, (data, status) => {
      // 키워드 검색 실행
      if (status === kakao.maps.services.Status.OK) {
        // 검색 성공 시
        setSearchResults(data); // 검색 결과를 상태로 업데이트
      }
    });
  };

  return (
    <>
    {/* 검색어 입력 필드 */}
      <input
        type="text" // 입력 필드 타입 (텍스트 입력)
        placeholder="키워드를 입력하세요" // 입력 필드의 힌트 텍스트
        value={keyword} // 입력 필드에 현재 키워드 상태 표시
        onChange={(e) => setKeyword(e.target.value)} // 입력값 변경 시 키워드 상태 업뎃
        onKeyDown={(e) => {
          // 키보드 이벤트 처리
          if (e.key === "Enter") handleSearch(); // Enter 키를 누르면 검색 실행
        }}
        style={{
          width: "94%", // 입력 필드 너비
          padding: "10px", // 내부 여백
          marginBottom: "10px", // 아래 여백
          fontSize: "14px", // 글자 크기
        }}
      />
      {/* 검색 버튼 */}
      <button
        onClick={handleSearch} // 클릭 시 검색 실행
        style={{
          width: "100%", // 버튼 너비
          padding: "10px", // 내부 여백
          fontSize: "14px", // 글자 크기
          backgroundColor: "#425470", //버튼 배경색
          color: "#fff", // 버튼 글자색
          border: "none", // 버튼 테두리 제거
          cursor: "pointer", // 마우스 올릴 때 포인터 표시
        }}
      >
        검색
      </button>
    </>
  );
}