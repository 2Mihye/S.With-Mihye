import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/KakaoMap.css";
import usersUserinfoAxios from "../token/tokenAxios";
import home from "./img/home.png";
import swithmarker from "./img/swithmarker.png";
import { useParams, Link } from "react-router-dom";

const KakaoMap = () => {
  const [userData, setUserData] = useState([]); //주소값
  const [bplcnms, setBplcnms] = useState([]); // 여러 개의 first_study를 저장할 배열
  const [markers, setMarkers] = useState([]); // 마커 배열 상태 추가
  const { post_no } = useParams(); // 동적 라우트 매개변수 가져오기
  const [postNo, setPostNo] = useState([]);

  const [detailPages, setDetailPage] = useState([]);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 서버에 사용자 정보를 가져오는 요청
        const response = await usersUserinfoAxios.get("/users/userinfo");
        setUserData(response.data); // 로그인한 토큰 이용해서 해당 유저 데이터 가져오는거
        console.log(userData);
      } catch (error) {
        console.error("Failed to fetch user data.", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFirstStudy = async () => {
      try {
        // 서버에 first_study 정보를 가져오는 요청
        const response = await usersUserinfoAxios.get("/post_list");
        setBplcnms(response.data.map((item) => item.first_study)); // first_study의 bplcnm 설정
        setPostNo(response.data.map((item) => item.post_no));
        console.log(response.data.map((item) => item.first_study));
      } catch (error) {
        console.error("Failed to fetch first study data.", error);
      }
    };

    fetchFirstStudy();
  }, []);

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const response = await usersUserinfoAxios.get(
          `/post_detail/${post_no}`
        );
        setDetailPage(response.data);
        setComments(response.data.comments);
        setPostNo(response.data.post_no);
      } catch (error) {
        console.log("Error fetching study detail: ", error);
      }
    };

    fetchStudyDetail();
  }, [post_no]); // post_no가 변경될 때마다 실행

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
          // default
          //맵
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 4,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성
        const geocoder = new window.kakao.maps.services.Geocoder(); //주소- 좌표 변환 객체

        // userData.useraddress 로그인한 유저의 DB에저장된 Address 부분
        geocoder.addressSearch(userData.useraddress, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            //정상적으로 검색이 완료 되면
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            ); //좌표 받기

            const imageSrc = home;
            const imageSize = new window.kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
            const imageOption = {
              offset: new window.kakao.maps.Point(27, 69),
            }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

            const markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption
            );

            // 마커를 생성합니다
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage, // 마커이미지 설정
            });
            marker.setMap(map, marker); // 홈 마커 지도에 표시
            map.setCenter(coords); // 사용자의 집 위치를 중심으로 지도 표시

            const fetchMarkers = async () => {
              try {
                const cafeMarkers = await Promise.all(
                  detailPages.map(async (item) => {
                    return new Promise((resolve) => {
                      geocoder.addressSearch(
                        item.first_study,
                        (result, status) => {
                          if (status === window.kakao.maps.services.Status.OK) {
                            const cafeCoords = new window.kakao.maps.LatLng(
                              result[0].y,
                              result[0].x
                            );

                            console.log("Marker Position:", cafeCoords);

                            const swithMarkerImage =
                              new window.kakao.maps.MarkerImage(
                                swithmarker,
                                new window.kakao.maps.Size(64, 64),
                                {
                                  offset: new window.kakao.maps.Point(27, 69),
                                }
                              );

                            const cafeMarker = new window.kakao.maps.Marker({
                              map: map,
                              position: cafeCoords,
                              image: swithMarkerImage,
                            });

                            console.log("Marker Created:", cafeMarker);

                            // Use a function to capture the value of item.post_no
                            const handleClick = (postNo) => {
                              return () => {
                                const url = `/post_detail/${postNo}`;
                                window.location.href = url;
                              };
                            };

                            // Add click event with the captured item.post_no
                            window.kakao.maps.event.addListener(
                              cafeMarker,
                              "click",
                              handleClick(item.post_no)
                            );

                            resolve(cafeMarker);
                          } else {
                            console.error("Geocoding failed:", status);
                            resolve(null);
                          }
                        }
                      );
                    });
                  })
                );

                console.log("All Markers:", cafeMarkers);

                setMarkers(cafeMarkers.filter((marker) => marker !== null));
              } catch (error) {
                console.error("Error fetching cafe markers: ", error);
              }
            };

            fetchMarkers();
          }
        });
      });
    };
  }, [userData.useraddress, bplcnms, post_no]);

  return (
    <div className="container">
      <div className="mt-5 px-5">
        <div className="adress_section">
          <h1 className="banner_font">{userData.useraddress}</h1>
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
