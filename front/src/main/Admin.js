//admin page, 1. user list  2.post list 3. rating/qna answer
import { useState, useEffect, useRef } from "react";
import "../css/MainPageCss.css";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "./img/search.png";
import DeleteIcon from "./img/delete.png";
import axios from "axios";
import usersUserinfoAxios from "../token/tokenAxios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

export default function Admin() {
  const [nickname, setNickname] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [boards, setBoards] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await usersUserinfoAxios.get(
        `/nicknameStudies?nickname=${nickname}`
      );
      const data = response.data || []; // 데이터가 없을 경우 빈 배열로 초기화
      setBoards(data);

      if (data !== null) {
        // board가 null이 아닐 때만 setFilteredResults 호출
        setFilteredResults(data); // 검색 결과를 바로 filteredResults 상태에 업데이트
      }
      console.log(data);
    } catch (error) {
      console.log("PostList 검색 시 오류", error);
    }
  };
  // useEffect를 사용하여 검색어(nickname)가 변경될 때마다 handleSearch 함수를 호출하도록 수정
  useEffect(() => {
    if (nickname.trim() !== "") {
      handleSearch();
    } else {
      setFilteredResults([]); // 검색어가 없을 경우 검색 결과를 초기화
    }
  }, [nickname]);

  const searchItems = (searchvalue) => {
    const lowercaseKeyword = searchvalue.toLowerCase(); // 검색어를 소문자로 변환
    setNickname(lowercaseKeyword); // 검색어 설정

    if (lowercaseKeyword !== "") {
      const filteredData = boards.filter((item) => {
        const values = Object.values(item).join("").toLowerCase(); // 게시글 내용을 소문자로 변환하여 비교
        return values.includes(lowercaseKeyword);
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(boards);
    }
  };

  return (
    <div>
      <Header />
      <div className="search_container">
        <img className="search_img" src={SearchIcon} alt="search_icon" />
        <input
          placeholder="닉네임을 입력하세요."
          class="searchInput"
          type="text"
          value={nickname}
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>
      <ul className="board_box_section">
        {nickname.length > 1 ? (
          filteredResults.length > 0 ? (
            filteredResults.map((board) => (
              <div key={board.post_no} onClick={(e) => e.stopPropagation()}>
                <Link
                  className="board_box"
                  to={`/post_detail/${board.post_no}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Link Clicked");
                  }}
                >
                  <li>
                    <div className="study_sort_badge">
                      <div className="study_sort_badge_content">
                        {board.recruit_type}
                      </div>
                    </div>
                    <div className="study_schedule">
                      <p className="">마감일</p>
                      <p>|</p>
                      <p>{board.recruit_deadline}</p>
                    </div>
                    <div>
                      <h1 className="board_title">{board.study_title}</h1>
                    </div>

                    {board.studyPostWithSkills !== null && (
                      <ul className="skill_icon_section">
                        {board.studyPostWithSkills.map((skill, index) => (
                          <li key={index}>{skill.skill_name}</li>
                        ))}
                      </ul>
                    )}
                    <div className="board_content_border"></div>
                    <section className="board_info_section">
                      <div className="board_info_left">
                        <div className="user_profile_img">
                          <img
                            className="user_profile_img_set"
                            width="30px"
                            height="30px"
                            src={`data:image/jpeg;base64,${board.user_profile}`}
                            alt="Profile"
                          />
                        </div>
                        <div>{board.nickname}</div>
                      </div>
                      <div className="board_info_right">
                        <div className="comment_count_section">
                          <p>댓글아이콘</p>
                          <p>{board.commentCount}</p>
                        </div>
                      </div>
                    </section>
                  </li>
                </Link>
              </div>
            ))
          ) : (
            <p>조건에 해당하는 게시물이 없습니다.</p>
          )
        ) : (
          filteredResults.map((board) => (
            <div key={board.post_no} onClick={(e) => e.stopPropagation()}>
              <Link
                className="board_box"
                to={`/post_detail/${board.post_no}`}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Link Clicked");
                }}
              >
                <li>
                  <div className="study_sort_badge">
                    <div className="study_sort_badge_content">
                      {board.recruit_type}
                    </div>
                  </div>
                  <div className="study_schedule">
                    <p className="">마감일</p>
                    <p>|</p>
                    <p>{board.recruit_deadline}</p>
                  </div>
                  <div>
                    <h1 className="board_title">{board.study_title}</h1>
                  </div>
                  {board.studyPostWithSkills !== null && (
                    <ul className="skill_icon_section">
                      {board.studyPostWithSkills.map((skill, index) => (
                        <li key={index}>{skill.skill_name}</li>
                      ))}
                    </ul>
                  )}
                  <div className="board_content_border"></div>
                  <section className="board_info_section">
                    <div className="board_info_left">
                      <div className="user_profile_img">
                        <img
                          className="user_profile_img_set"
                          width="30px"
                          height="30px"
                          src={`data:image/jpeg;base64,${board.user_profile}`}
                          alt="Profile"
                        />
                      </div>
                      <div>{board.nickname}</div>
                    </div>
                    <div className="board_info_right">
                      <div className="comment_count_section">
                        <p>댓글아이콘</p>
                        <p>{board.commentCount}</p>
                      </div>
                    </div>
                  </section>
                </li>
              </Link>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}
