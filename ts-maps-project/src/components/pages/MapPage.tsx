import React, { useState } from "react";
import SearchBar from "../common/SearchBar";
import SearchResults from "../common/SearchResults";
import KakaoMap from "../common/KaKaoMap";
import useKakaoLoader from "../../hooks/useKaKaoLoader";

// 지도와 검색 결과 페이지를 구성하는 메인 컴포넌트
export default function MapPage() {
  // 카카오 맵 API를 로드하기 위한 커스텀 훅
  useKakaoLoader();

  // 사용자가 입력한 키워드의 상태
  const [keyword, setKeyword] = useState<string>("");

  // 검색 결과 데이터를 저장하는 상태 (검색된 위치들의 배열)
  const [searchResults, setSearchResults] = useState([]);

  // 로드뷰에서 보여줄 위치를 저장하는 상태 (위도, 경도 객체)
  const [roadviewPosition, setRoadviewPosition] = useState(null);

  // 지도와 로드뷰 상태를 전환하기 위한 상태
  const [isRoadviewVisible, setIsRoadviewVisible] = useState<boolean>(false); // 지도 & 로드뷰 상태

  // 로드뷰와 지도를 전환하는 함수
  const toggleRoadview = () => setIsRoadviewVisible((prev) => !prev);

  return (
    <div style={{ display: "flex" }}>
      {/* 왼쪽 패널 : 검색창, 검색 결과, 로드뷰 전환 버튼 */}
      <div
        style={{
          width: "25%", // 패널 너비
          padding: "10px", // 내부 여백
          overflowY: "auto", // 세로 스크롤 활성화
          height: "900px", // 고정된 높이
        }}
      >
        {/* 검색 입력창 컴포넌트 */}
        <SearchBar
          keyword={keyword} // 현재 검색 키워드 상태를 전달
          setKeyword={setKeyword} // 키워드 업테이드 함수 전달
          setSearchResults={setSearchResults} // 검색 결과 상태 업데이트 함수 전달
        />

        {/* 검색 결과 목록 컴포넌트 */}
        <SearchResults
          results={searchResults} // 검색 결과 배열 전달
          setRoadviewPosition={(position) => {
            // 사용자가 검색 결과 항목을 클릭했을때 호출
            setRoadviewPosition(position); // 로드부의 위치 설정
            setIsRoadviewVisible(true); // 검색 클릭 시 로드뷰 화면 활성화
          }}
        />

        {/* 로드븅와 지도를 전환하는 버튼 */}
        <button
          onClick={toggleRoadview} // 클릭 시 지도 & 로드뷰 상태 전환
          style={{
            marginTop: "10px", // 버튼 상단 여백
            padding: "10px", // 버튼 내부 여백
            backgroundColor: isRoadviewVisible ? "#d9534f" : "#5bc0de", // 상태에 따라 색상 변경
            color: "#fff", // 텍스트 색상
            border: "none", // 테두리 제거
            cursor: "pointer", // 포인터 커서
            width: "100%", // 버튼 너비를 패널 너비에 맞춤
          }}
        >
          {/* 지도와 로드뷰 전환 버튼 & 상태에 따라 버튼 텍스트 변경 */}
          {isRoadviewVisible ? "지도 보기" : "로드뷰 보기"}
        </button>
      </div>
      <div style={{ width: "75%" }}>
        <KakaoMap
          roadviewPosition={roadviewPosition} // 로드뷰 위치 전달
          searchResults={searchResults} // 검색 결과 전달 (마커 표시용)
          isRoadviewVisible={isRoadviewVisible} // 지도 & 로드뷰 상태 전달
        />
      </div>
    </div>
  );
}
