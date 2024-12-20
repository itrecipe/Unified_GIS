import { useEffect } from "react";

/* useEffect 
  - 컴포넌트가 마운트되면 스크립트를 추가하여 kakao maps api를 로드
  - 언마운드될 때 스크립트를 깨끗이 제거

  &autoload=false : kakao maps api 자동 로딩을 막고, 
  필요할 때만 window.kakao.maps.load로 로드
*/

const useKakaoLoader = () => {
  useEffect(() => {
    // Kakao Maps API를 로드하는 스크립트 추가
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=df1b51c325e84511473203333707d4e2&libraries=services&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log("Kakao Maps API 로드 완료!");

      // kakao maps api 로드 후 초기화
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map"); // "map" 이라는 id를 가진 div를 찾음
          const options = {
            center: new window.kakao.maps.LatLng(33.45701, 126.570667), // 지도 중심 좌표
            level: 3, // 확대 레벨
          };

          //지도 생성하기
          new window.kakao.maps.Map(container, options);
        });
      } else {
        console.error("kakao maps 객체를 찾을 수 없음!");
      }
    };

    script.onerror = () => {
      console.error("Kakao Maps API 로드 중 에러 발생!");
    };

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);
};

export default useKakaoLoader;
