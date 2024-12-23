// src/components/common/RoadviewWithMapButton.tsx
import React, { useEffect, useRef, useState } from "react";
import { Roadview, Map, MapMarker, MapTypeId } from "react-kakao-maps-sdk";

const RoadviewWithMapButton = () => {
  const [isAtive, setIsAtive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const roadviewRef = useRef<kakao.maps.Roadview | null>(null);

  const [center, setCenter] = useState({
    lat: 33.450422139819736,
    lng: 126.5709139924533,
  });

  useEffect(() => {
    const map = mapRef.current;
    const roadview = roadviewRef.current;
    if (roadview && map) {
      roadview.relayout();
      map.relayout();
      map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
    }
  }, [isVisible, center, isAtive]);

  return (
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100%" }}>
      <div id="roadviewControl" className={isAtive ? "active" : ""} onClick={() => {
        setIsVisible(true);
        setIsAtive(!isAtive);
      }}>
        <span className="img"></span>
      </div>
      <div style={{ position: "relative", width: isVisible ? "50%" : "0", overflow: "hidden" }}>
        <Roadview
          position={{ ...center, radius: 50 }}
          style={{ width: "100%", height: "300px" }}
          onPositionChanged={(rv) => {
            setCenter({
              lat: rv.getPosition().getLat(),
              lng: rv.getPosition().getLng(),
            });
          }}
          onPanoidChange={() => {
            isAtive && setIsVisible(true);
          }}
          onErrorGetNearestPanoId={() => {
            setIsVisible(false);
          }}
          ref={roadviewRef}
        >
          <div id="close" title="로드뷰닫기" onClick={() => setIsVisible(false)}>
            <span className="img"></span>
          </div>
        </Roadview>
      </div>
    </div>
  );
};

export default RoadviewWithMapButton;
