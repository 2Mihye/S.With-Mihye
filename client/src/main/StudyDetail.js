import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import "../css/StudyDetail.css";
import "../css/NewBoard.css";
import usersUserinfoAxios from "../token/tokenAxios";
import axios from "axios";

function StudyDetail() {
  const { post_no } = useParams(); // 동적 라우트 매개변수 가져오기

  const [detailPages, setDetailPage] = useState([]);
  const [swithUser, setSwithUser] = useState("");
  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const response = await usersUserinfoAxios.get(
          `/post_detail/${post_no}`
        );
        setDetailPage(response.data);
        console.log(detailPages);
        console.log(post_no.study_title);
      } catch (error) {
        console.log("Error fetching study detail: ", error);
      }
    };

    fetchStudyDetail();
  }, [post_no]); // post_no가 변경될 때마다 실행

  // 이미지 정보를 가져오기 위해 만들어줌
  useEffect(() => {
    // detailPages.user_no를 사용하여 요청을 보내도록 수정
    if (detailPages && detailPages.user_no) {
      const fetchStudyDetailUserNo = async () => {
        try {
          const response = await usersUserinfoAxios.get(
            `/users/info/${detailPages.user_no}`
          );
          setSwithUser(response.data);
        } catch (error) {}
      };

      fetchStudyDetailUserNo();
    }
  }, [detailPages]);

  useEffect(() => {
    // swithUser 상태가 업데이트되면 실행
  }, [swithUser]);

  // studyPostWithSkills에 대한 중복제거 조건문 추가
  const uniqueSkills = detailPages.studyPostWithSkills && [
    ...new Set(
      detailPages.studyPostWithSkills.map((skill) => skill.skill_name)
    ),
  ];

  return (
    <div>
      <Header />
      <div className="studyDetail_wrapper">
        <section className="postHeader">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            cursor="pointer"
            height="30"
            width="30"
          >
            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
          </svg>

          <div className="studyContent_title">{detailPages.study_title}</div>

          <div className="studyContent_user_date">
            <div className="studyContent_user">
              <img
                className="user_img"
                width="30px"
                height="30px"
                src={`data:image/jpeg;base64,${swithUser.user_profile}`}
                alt="Profile"
              />
              <div className="username">{detailPages.nickname}</div>
            </div>
            <div className="studyContent_seperator"></div>
            <div className="studyContent_registerDate"></div>
          </div>
          <section>
            <ul className="studyContent_grid">
              <li className="studyContent_contentWrapper">
                <span className="studyInfo_title">모집구분</span>
                <span className="studyInfo_title_a">
                  {detailPages.recruit_type}
                </span>
              </li>
              <li className="studyContent_contentWrapper">
                <span className="studyInfo_title">진행방식</span>
                <span className="studyInfo_title_a">
                  {detailPages.study_method}
                </span>
              </li>
              <li className="studyContent_contentWrapper">
                <span className="studyInfo_title">모집인원</span>
                <span className="studyInfo_title_a">8명</span>
              </li>
              <li className="studyContent_contentWrapper">
                <span className="studyInfo_title">시작예정일</span>
                <span className="studyInfo_title_a">
                  {detailPages.study_start}
                </span>
              </li>
              <li className="studyContent_contentWrapper">
                <span className="studyInfo_title">예상기간</span>
                <span className="studyInfo_title_a">
                  {detailPages.study_period}
                </span>
              </li>
              <li className="studyContent_contentWrapper">
                <span className="studyInfo_title">모집마감</span>
                <span className="studyInfo_title_a">
                  {detailPages.recruit_deadline}
                </span>
              </li>
              <li className="studyContent_contentWrapper">
                <span className="studyInfo_title">지역</span>
                <span className="studyInfo_title_a">
                  {detailPages.study_location}
                </span>
              </li>
              {detailPages.study_method === "온라인" ? null : (
                <li className="studyContent_contentWrapper">
                  <span className="studyInfo_title">첫모임장소</span>
                  <span className="studyInfo_title_a">
                    {detailPages.first_study}
                  </span>
                </li>
              )}
              <li className="studyContent_contentWrapper">
                <span className="studyInfo_title">기술스택</span>
                <span className="studyInfo_title_a">
                  {uniqueSkills &&
                    uniqueSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                </span>
              </li>
            </ul>
          </section>
        </section>
        <div className="postContent_wrapper">
          <h2 className="postInfo">{detailPages.study_title}</h2>
          <p className="postContent">{detailPages.study_content}</p>
        </div>

        <div style={{ paddingBottom: "80px" }}>
          <div className="commentInput">
            <div className="commentInput_comment">
              댓글 <span className="commentInput_count">1</span>
            </div>
            <div className="commentInput_container">
              <img
                className="commentInput_profile"
                width="30px"
                height="30px"
                src={`data:image/jpeg;base64,${swithUser.user_profile}`}
                alt="Profile"
              />
              <textarea
                class="commentInput_commentText"
                placeholder="댓글을 입력하세요."
              ></textarea>
            </div>
            <div className="commentInput_buttonWrapper">
              <button className="commentInput_buttonComplete" name="register">
                댓글 등록
              </button>
              <button className="commentInput_buttonComplete">
                게시글 수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyDetail;
