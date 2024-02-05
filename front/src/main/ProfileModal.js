import "../css/Profile.css";
import usersUserinfoAxios from "../token/tokenAxios";
import { useState, useEffect } from "react";

export default function ProfileModal({ onClick, userNo }) {
  const [profileUser, setProfileUser] = useState(""); // 이 부분에서 빈 문자열이 아니라 null 또는 객체로 초기화하는 것이 좋습니다.
  const [swithHistory, setSwithHistory] = useState([]);

  useEffect(() => {
    // userNo가 변경될 때마다 수행되는 코드
    if (userNo) {
      // 사용자 정보가 변경될 때마다 S.With History도 다시 가져오도록 처리
      fetchSwithHistory(userNo);
    }
  }, [userNo]);

  const fetchSwithHistory = async (user_no) => {
    try {
      // 서버에 사용자 정보를 가져오는 요청
      const response = await usersUserinfoAxios.get(
        `/attending_studies/${user_no}`
      );

      // 여기서 response.data가 배열인지 확인하고 업데이트
      if (Array.isArray(response.data)) {
        setSwithHistory(response.data);
        setProfileUser(response.data[0]); // 여기서 사용자 정보를 설정할 부분을 수정
      } else {
        // 만약 배열이 아니면 적절한 처리를 해주어야 합니다.
        console.error(
          "FetchSwithHistory: Data is not an array.",
          response.data
        );
      }

      console.log("swithHistory: ", swithHistory);
    } catch (error) {
      console.error("Failed to fetchSwithHistory.", error);
    }
  };

  if (!profileUser) {
    return null; // 사용자 정보가 없는 경우, 렌더링을 중단하거나 로딩 스피너를 표시할 수 있습니다.
  }

  return (
    <section className="vh-100">
      <div className="container py-1 h-100">
        <div className="row d-flex justify-content-center align-items-center h-10">
          <div className="">
            <div style={{ borderRadius: "15px" }}>
              <div className="card-body text-center">
                <div className="mt-3 mb-3">
                  <img
                    className="profile_image"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    src={`data:image/jpeg;base64,${profileUser.user_profile}`}
                    alt="profile_image"
                  />
                </div>
                <p className="mb-2 swith_title" style={{ fontSize: "27px" }}>
                  {profileUser.nickname}
                </p>
                <p className="mb-2">스윗지수</p>
              </div>
            </div>
          </div>
        </div>
        <div className="swith_detail">
          <div className="mt-4">
            <h4 style={{ fontSize: "27px" }} className="swith_title">
              S.With Me
            </h4>
            <p style={{ fontSize: "14px" }}>{profileUser.user_introduction}</p>
          </div>
          <div className="mt-4">
            <h4 style={{ fontSize: "27px" }} className="swith_title">
              S.With History
            </h4>
            <p style={{ fontSize: "14px" }}>
              {swithHistory.map((history) => (
                <li key={history.study_no}>{history.study_title}</li>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
