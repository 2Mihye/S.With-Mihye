//참가현황
//유저프로필 - 해당 게시글의 승낙, 거절 기능
//디테일 페이지에 신청버튼 만들어서 연결
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/StudyDetail.css";
import Accept from "./img/accept.png";
import Reject from "./img/reject.png";
import usersUserinfoAxios from "../token/tokenAxios";

export default function StudyApplication() {
  const { post_no } = useParams(); // 동적 라우트 매개변수 가져오기
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  const [applicantData, setApplicantData] = useState([]);

  const fetchApplicantData = async () => {
    try {
      const response = await usersUserinfoAxios.get(
        `/application_update/${post_no}`
      );
      setApplicantData(response.data);
      console.log("보이니", response.data);
    } catch (error) {
      console.error("Failed applicant 데이터 가져오기 실패", error);
    }
  };
  useEffect(() => {
    fetchApplicantData();
  }, [post_no]);

  const handleAccept = async (accept, user_no) => {
    try {
      const action = accept ? "accept" : "reject";
      await usersUserinfoAxios.post(
        `/application_update/${post_no}/${user_no}?action=${action}`
      );
      // 성공적으로 요청이 완료되면 데이터를 다시 가져옴
      fetchApplicantData();
    } catch (error) {
      console.error(`Failed to ${accept ? "accept" : "reject"} user`, error);
    }
  };

  return (
    <div className="studyApplication">
      <p className="studyApplication_title">S.With 신청 현황 (2/5)</p>
      <div className="studyApplaction_user">
        {applicantData &&
          applicantData.map((users, index) => (
            <li
              key={index}
              className="studyApplaction_user_li"
              style={{ whiteSpace: "nowrap" }}
            >
              <div className="studyApplaction_user_p">
                {users.nickname}
                <div>
                  {!isEditing && (
                    <div className="register_swithButton">
                      <button
                        name="accept"
                        onClick={() => handleAccept(true, users.user_no)}
                      >
                        <img
                          className="accept_img"
                          src={Accept}
                          alt="accepr_img"
                        />
                      </button>
                      <button
                        name="reject"
                        onClick={() => handleAccept(false, users.user_no)}
                      >
                        {" "}
                        <img
                          className="reject_img"
                          src={Reject}
                          alt="reject_img"
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
      </div>
    </div>
  );
}
