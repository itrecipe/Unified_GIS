import React from "react"
import { Map, MapMarker} from "react-kakao-maps-sdk"
import useKakaoLoader from "../../hooks/useKaKaoLoader"
import AddMapCustomControlStyle from "../../styles/addMapCustomControl.style"
import {useRef, useState} from "react"

export default function MapPages() {
  useKakaoLoader()

  const mapRef = useRef<kakao.maps.Map>(null)
  const [mapType, setMapType] = useState<"roadmap" | "skyview">("roadmap");

  const zoomIn = () => {
    const map = mapRef.current
    if(!map) return;
    map.setLevel(map.getLevel() - 1);
  }

  const zoomOut = () => {
    const map = mapRef.current
    if (!map) return; 
    map.setLevel(map.getLevel() + 1);
  }

  return (
    <>
      <AddMapCustomControlStyle />
      <div className={`map_wrap`}>
        <Map // Map container
          id="map"
          center={{
            lat: 33.450701, // Map center latitude
            lng: 126.570667, // Map center longitude
          }}
          style={{
            width: "100%",
            height: "500px",
            position: "relative",
            overflow: "hidden",
          }}
          level={3} // Map zoom level
          mapTypeId={mapType === "roadmap" ? "ROADMAP" : "HYBRID"}
          ref={mapRef}
        >
          {/** 
          <MapTypeControl position={"TOPRIGHT"} />
          <ZoomControl position={"RIGHT"} />
          */}

          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
            <div style={{ color: "#000" }}>Hello World!</div>
          </MapMarker>
      </Map>

        {/* Map type control buttons */}
        <div className="custom_typecontrol radius_border">
          <span
            id="btnRoadmap"
            className={mapType === "roadmap" ? "selected_btn" : "btn"}
            onClick={() => setMapType("roadmap")}
          >
            지도
          </span>
          <span
            id="btnSkyview"
            className={mapType === "skyview" ? "selected_btn" : "btn"}
            onClick={() => setMapType("skyview")}
          >
            스카이뷰
          </span>
        </div>

        {/* Zoom control buttons */}
        <div className="custom_zoomcontrol radius_border">
          <span onClick={zoomIn}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </span>
          <span onClick={zoomOut}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </span>
        </div>
      </div>
    </>
  );
}
