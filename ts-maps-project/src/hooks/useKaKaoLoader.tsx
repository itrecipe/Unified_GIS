import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

interface KakaoLoaderOptions {
  appkey: string;
  libraries: Array<"clusterer" | "drawing" | "services">;
}

export default function useKakaoLoader(): void {
  useKakaoLoaderOrigin({
    /**
     * ※주의※ appkey의 경우 본인의 appkey를 사용하셔야 합니다.
     * 해당 키는 docs를 위해 발급된 키 이므로, 임의로 사용하셔서는 안됩니다.
     *
     * @참고 https://apis.map.kakao.com/web/guide/
     */
    appkey: "b72395e3f7e629d373929d1ba28add82?",
    libraries: ["clusterer", "drawing", "services"],
  } as KakaoLoaderOptions);
}

// import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

// export default function useKakaoLoader() {
//   useKakaoLoaderOrigin({
//     /** 
//      * ※주의※ appkey의 경우 본인의 appkey를 사용하셔야 합니다.
//      * 해당 키는 docs를 위해 발급된 키 이므로, 임의로 사용하셔서는 안됩니다.
//      * 
//      * @참고 https://apis.map.kakao.com/web/guide/
//      */
//     appkey: "자스키",
//     libraries: ["clusterer", "drawing", "services"],
//   })
// }