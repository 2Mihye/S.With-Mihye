import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import "../css/StudyDetail.css";
import "../css/NewBoard.css";
import usersUserinfoAxios from "../token/tokenAxios";
import axios from "axios";
import StudyDetailUpdate from "./StudyDetailUpdate";

function StudyDetail() {
  const { post_no } = useParams(); // 동적 라우트 매개변수 가져오기

  const [detailPages, setDetailPage] = useState([]);
  const [addComment, setAddComment] = useState([]);
  const [comment, setComment] = useState({
    comment_no: "",
    user_no: "",
    post_no: "",
    comment_content: "",
    nickname: "",
    user_profile: "",
  });

  // 게시글 댓글 쓴 유저 = detailCommentUser
  const [detailCommentUser, setDetailCommentUser] = useState([]);

  // 게시글 쓴 유저 = swithUser
  const [swithUser, setSwithUser] = useState("");

  // 유저 데이터 가져오기
  // 로그인된 유저 = userData
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 서버에 사용자 정보를 가져오는 요청
        const response = await usersUserinfoAxios.get("/users/userinfo");
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.error("Failed to fetch user data.", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // swithUser 상태가 업데이트되면 실행
  }, [swithUser]);

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const response = await usersUserinfoAxios.get(
          `/post_detail/${post_no}`
        );
        setDetailCommentUser(response.data.comments);
        setDetailPage(response.data);
        setComment(response.data.comments || []); // 댓글 목록 설정
        console.log(detailPages);
        console.log(response.data.comments);
      } catch (error) {
        console.log("Error fetching study detail: ", error);
      }
    };

    fetchStudyDetail();
  }, [post_no, addComment]); // post_no가 변경될 때마다 실행

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
          setDetailCommentUser((user_no) => response.data);
        } catch (error) {}
      };

      fetchStudyDetailUserNo();
    }
  }, [detailPages]);

  // 게시글 삭제
  const handleDeletePost = async () => {
    try {
      await usersUserinfoAxios.get(`/delete/${post_no}`);
      window.location.href = "/";
    } catch (error) {
      console.log("Delete Post Error", error);
    }
  };

  // 댓글 추가 변경 핸들러
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment((comment) => ({ ...comment, [name]: value }));
  };
  // 댓글 추가
  const handleAddComment = async () => {
    try {
      const response = await usersUserinfoAxios.post(
        `/add_comment/${post_no}/${userData.user_no}`,
        {
          ...comment,
        },
        {
          withCredentials: true,
        }
      );
      console.log("댓글이 성공적으로 등록되었습니다.");

      // 새로운 댓글 목록을 다시 가져오기
      const updatedDetail = await usersUserinfoAxios.get(
        `/post_detail/${post_no}`
      );
      setDetailPage(updatedDetail.data);
    } catch (error) {
      console.log("댓글 등록 에러: ", error);
    }
    const textarea = document.querySelector(".commentInput_commentText");
    textarea.value = ""; // textarea 초기화
    textarea.placeholder = "댓글을 입력하세요."; // placeholder 다시 설정
    console.log(comment.comment_content);
  };

  // 댓글 삭제하기
  const handleDeleteComment = async (comment) => {
    console.log("comment.handleDeleteComment : " + comment.comment_no);
    try {
      await usersUserinfoAxios.delete(
        `/delete_comment/${post_no}/${userData.user_no}/${comment.comment_no}`,
        {
          withCredentials: true,
        }
      );
      console.log("댓글이 성공적으로 삭제되었습니다.");
      // 댓글 삭제 후 상태 업데이트
      const updatedComments = detailPages.comments.filter(
        (c) => c.comment_no !== comment.comment_no
      );
      setDetailPage({ ...detailPages, comments: updatedComments });
    } catch (error) {
      console.log("댓글 삭제 에러: ", error);
    }
    console.log(post_no);
    console.log(comment.comment_no);
    console.log(userData.user_no);
  };

  const [commentToUpdate, setCommentToUpdate] = useState("");

  // 댓글 내용 변경 핸들러
  // 사용자가 댓글을 수정할 때 입력한 내용을 commentToUpdate 상태에 반영
  const handleCommentToUpdateChange = (e) => {
    const { value } = e.target;
    setCommentToUpdate((prevCommentToUpdate) => ({
      ...prevCommentToUpdate,
      comment_content: value,
    }));
  };

  // 댓글 수정 버튼 클릭 시 실행되는 함수
  const handleEditComment = (comment) => {
    // 선택한 댓글의 내용을 수정할 수 있는 입력창에 표시
    setCommentToUpdate(comment);
  };

  // comment = 기존의 댓글
  const handleUpdateComment = async (comment) => {
    try {
      await usersUserinfoAxios.post(
        `/update_comment/${post_no}/${userData.user_no}/${comment.comment_no}`,
        {
          comment_content: commentToUpdate.comment_content, // 수정된 댓글 내용만을 전송합니다.
        },
        {
          withCredentials: true,
        }
      );
      console.log("댓글 수정 완료!");
      // 댓글 상태 업데이트하여 화면 다시 렌더링\
      const updatedComments = detailPages.comments.map((c) =>
        c.comment_no === comment.comment_no
          ? { ...c, comment_content: commentToUpdate.comment_content }
          : c
      );

      setDetailPage({ ...detailPages, comments: updatedComments });
      // 수정 완료 후 commentToUpdate 초기화
      setCommentToUpdate("");
    } catch (error) {
      console.log("댓글 수정 오류", error);
    }
    console.log(post_no);
    console.log(comment.comment_no);
    console.log(userData.user_no);
    console.log(commentToUpdate.comment_content);
  };

  // 게시글 수정 페이지로 이동
  const handleButtonClick = () => {
    window.location.href = `/StudyDetailUpdate/${post_no}`;
  };

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
            댓글
            <ul className="commentList_CommentList">
              {detailPages.comments &&
                [...detailPages.comments]
                  .reverse()
                  .map((comment, comment_no) => (
                    <li className="commentInput_comment" key={comment_no}>
                      <section className="commentInput_comment_Header">
                        <div className="commentItem_avatarWrapper">
                          <img
                            className="commentInput_profile"
                            width="30px"
                            height="30px"
                            src={`data:image/jpeg;base64,${comment.user_profile}`}
                            alt="Profile"
                          />
                          <div className="commentItem_userNickname">
                            {comment.nickname}

                            <div className="commentItem_registeredDate">
                              {comment.comment_post_time}
                            </div>
                          </div>
                        </div>

                        {commentToUpdate &&
                        commentToUpdate.comment_no === comment.comment_no ? (
                          <div>
                            <textarea
                              className="commentInput_commentText"
                              value={commentToUpdate.comment_content}
                              onChange={handleCommentToUpdateChange} // 댓글 변경 핸들러 연결
                            ></textarea>
                            <button
                              className="commentInput_buttonComplete"
                              onClick={() =>
                                handleUpdateComment(commentToUpdate)
                              }
                            >
                              수정 완료
                            </button>
                          </div>
                        ) : (
                          <div>
                            <p>{comment.comment_content}</p>
                            {comment.user_no === userData.user_no && (
                              <div>
                                <button
                                  className="commentDelete_buttonComplete"
                                  onClick={() => handleEditComment(comment)}
                                >
                                  댓글 수정
                                </button>
                                <button
                                  className="commentDelete_buttonComplete"
                                  onClick={() => handleDeleteComment(comment)}
                                >
                                  댓글 삭제
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </section>
                    </li>
                  ))}
            </ul>
          </div>
          <span className="commentInput_count"></span>
        </div>
        <div className="commentInput_container">
          <img
            className="commentInput_profile"
            width="30px"
            height="30px"
            src={`data:image/jpeg;base64,${userData.user_profile}`}
            alt="Profile"
          />
          <div className="commentItem_userNickname">{userData.nickname}</div>
          <textarea
            class="commentInput_commentText"
            placeholder="댓글을 입력하세요."
            name="comment_content"
            onChange={handleCommentChange} // 댓글 변경 핸들러 연결
          ></textarea>
        </div>
        <div className="commentInput_buttonWrapper">
          <button
            className="commentInput_buttonComplete"
            name="comment_no"
            onClick={handleAddComment}
          >
            댓글 등록
          </button>
          <button
            className="commentInput_buttonComplete"
            onClick={handleButtonClick}
          >
            게시글 수정하기
          </button>
          <button
            className="commentInput_buttonComplete"
            onClick={handleDeletePost}
          >
            게시글 삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyDetail;
