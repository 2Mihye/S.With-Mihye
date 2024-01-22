import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/KakaoMap.css";

const KakaoMap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=89730aca4ca56bd725e48019977366cc&autoload=false";

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.502, 127.026581),
          level: 4,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        var content =
          '<div class="overlaybox">' +
          '    <div class="boxtitle">금주 영화순위</div>' +
          '    <div class="first">' +
          '        <div class="triangle text">1</div>' +
          '        <div class="movietitle text">드래곤 길들이기2</div>' +
          "    </div>" +
          "    <ul>" +
          '        <li class="up">' +
          '            <span class="number">2</span>' +
          '            <span class="title">명량</span>' +
          '            <span class="arrow up"></span>' +
          '            <span class="count">2</span>' +
          "        </li>" +
          "        <li>" +
          '            <span class="number">3</span>' +
          '            <span class="title">해적(바다로 간 산적)</span>' +
          '            <span class="arrow up"></span>' +
          '            <span class="count">6</span>' +
          "        </li>" +
          "        <li>" +
          '            <span class="number">4</span>' +
          '            <span class="title">해무</span>' +
          '            <span class="arrow up"></span>' +
          '            <span class="count">3</span>' +
          "        </li>" +
          "        <li>" +
          '            <span class="number">5</span>' +
          '            <span class="title">안녕, 헤이즐</span>' +
          '            <span class="arrow down"></span>' +
          '            <span class="count">1</span>' +
          "        </li>" +
          "    </ul>" +
          "</div>";

        const position = new window.kakao.maps.LatLng(37.49887, 127.026581);

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: position,
          content: content,
          xAnchor: 0.3,
          yAnchor: 0.91,
        });

        customOverlay.setMap(map);
      });
    };
  }, []);

  return (
    <div className="container">
      <div className="mt-5 px-5">
        <div className="adress_section">
          <h1 className="banner_font">강남 역삼동 스윗</h1>
          <br />
        </div>

        <div
          id="map"
          style={{
            width: "100%",
            height: "450px",
            borderRadius: "30px",
            border: "5px solid #b9eeff",
          }}
        ></div>
      </div>
    </div>
  );
};

export default KakaoMap;
