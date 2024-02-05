import { useState, useEffect, useRef } from "react";
import "../css/MainPageCss.css";
import KakaoMap from "./KakaoMap";
import "../css/KakaoMap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeartButton from "./HeartButton";
import SearchIcon from "./img/search.png";
import DeleteIcon from "./img/delete.png";
import axios from "axios";
import usersUserinfoAxios from "../token/tokenAxios";
import StudyDetail from "./StudyDetail";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import Modal from "./Modal";
import ProfileModal from "./ProfileModal";

function MainContent() {
  const [isSkillVisible, setSkillVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState([]);

  const [isCityVisible, setCityVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState([]);

  const [isRecruitVisible, setRecruitVisible] = useState(false);
  const [selectedRecruit, setSelectedRecruit] = useState([]);

  const [isMethodVisible, setMethodVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState([]);

  const [like, setLike] = useState([]);

  const [filteredBoards, setFilteredBoards] = useState([]);
  const modalEl = useRef();

  useEffect(() => {
    if (modalEl.current && isSkillVisible) {
      // modalEl이 정의되었고, isSkillVisible이 true일 때만 ref를 적용
      // 예를 들어, modalEl.current를 출력하여 확인할 수 있습니다.
      console.log(modalEl.current);
    }
  }, [isSkillVisible]);

  const handleClickOutside = ({ target }) => {
    if (isSkillVisible && !modalEl.current.contains(target))
      toggleContentSkill(); // 이미 토글 처리 함수 사용
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const [swithUser, setSwithUser] = useState("");
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardsResponse = await usersUserinfoAxios.get("/post_list");
        setBoards(boardsResponse.data);

        // Fetch user data
        const userResponse = await usersUserinfoAxios.get("/users/userinfo");
        setUserData(userResponse.data);

        Zzim(userData.user_no, boards.post_no);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleContentSkill = (skill) => {
    setSkillVisible(!isSkillVisible);
    if (skill) {
      setSelectedSkill([skill.skill_name]); // 객체의 프로퍼티를 사용하여 스킬 이름을 선택된 스킬로 설정
    }
  };

  const toggleContentCity = (city) => {
    setCityVisible(!isCityVisible);
    if (city) {
      setSelectedCity([city]); // 선택된 도시로 설정
    }
  };

  const toggleContentRecruit = (recruit) => {
    setRecruitVisible(!isRecruitVisible);
    setSelectedRecruit([recruit]); // 선택된 모집구분으로 설정
  };

  const toggleContentMethod = (method) => {
    setMethodVisible(!isMethodVisible);
    setSelectedMethod([method]); // 선택된 진행방식으로 설정
  };
  // 클릭된 상태를 관리하는 배열 추가
  const [clickedSkills, setClickedSkills] = useState([]);
  const [clickedCity, setClickedCity] = useState("");
  const [clickedRecruit, setClickedRecruit] = useState("");
  const [clickedMethod, setClickedMethod] = useState("");

  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    try {
      const response = await usersUserinfoAxios.get(
        `/KeywordStudy?keyword=${keyword}`
      );
      setBoards(response.data);
    } catch (error) {
      console.log("PostList 검색 시 오류", error);
    }
  };

  const searchItems = (searchvalue) => {
    const lowercaseKeyword = searchvalue.toLowerCase(); // 검색어를 소문자로 변환

    setKeyword(lowercaseKeyword); // 검색어 설정

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

  console.log(keyword);

  const [filteredResults, setFilteredResults] = useState([]);

  const handleToggle = (toggle) => {
    setSelectedSkill((prevToggles) =>
      prevToggles.includes(toggle)
        ? prevToggles.filter((selected) => selected !== toggle)
        : [...prevToggles, toggle]
    );
  };

  const methods = ["온라인", "오프라인", "온/오프 병행"];

  const cities = [
    "강남/역삼/삼성",
    "신사/청담/압구정",
    "서초/교대/사당",
    "잠실/송파/강동",
    "을지로/명동/중구/동대문",
    "서울역/이태원/용산",
    "종로/인사동",
    "홍대/합정/마포/서대문",
    "여의도",
    "구로/신도림/금천",
    "건대입구/성수/왕십리",
    "성북/강북/노원/도봉",
    "기타",
  ];

  const skills = [
    "Angular",
    "C",
    "C++",
    "Django",
    "Docker",
    "Express",
    "Figma",
    "Firebase",
    "Flask",
    "Flutter",
    "Git",
    "Flask",
    "Go",
    "GraphQL",
    "Java Script",
    "Java",
    "Kubernetes",
    "MongoDB",
    "mySql",
    "NestJS",
    "NodeJS",
    "Php",
    "Python",
    "R",
    "React",
    "React Native",
    "Spring",
    "Svelte",
    "Swift",
    "Type Script",
    "Unity",
    "Vue",
    "Zeplin",
  ];

  // 각 스킬에 대해 skill_no를 부여합니다.
  skills.forEach((skill, index) => {
    skills[index] = { skill_no: index + 1, skill_name: skill };
  });

  console.log(skills);

  const recruits = ["프로젝트", "스터디", "멘토/멘티"];

  // 기술스택 핸들러
  const handleClickSkill = (skill) => {
    if (typeof skill === "object" && skill !== null && "skill_no" in skill) {
      skill = skill.skill_no; // 객체일 경우 스킬 이름으로 설정
    }

    if (clickedSkills.includes(skill)) {
      setClickedSkills(clickedSkills.filter((clicked) => clicked !== skill));
    } else {
      if (clickedSkills.length > 4) {
        alert("최대 5개까지만 선택 가능합니다.");
      } else {
        setClickedSkills([...clickedSkills, skill]);
      }
    }
    setSelectedSkill(clickedSkills);
  };

  console.log("selectedSkill: ", selectedSkill);

  useEffect(() => {
    // 모든 클릭된 스킬을 선택된 스킬로 설정
    setSelectedSkill(clickedSkills);
  }, [clickedSkills]);

  // 지역 핸들러
  const handleClickCity = (city) => {
    // 클릭된 지역을 선택된 지역으로 설정
    setClickedCity(city);
  };

  useEffect(() => {
    // 클릭된 지역을 선택된 지역으로 설정
    setSelectedCity(clickedCity ? [clickedCity] : []);
  }, [clickedCity]);

  //모집구분핸들러
  const handleClickRecruit = (recruit) => {
    setClickedRecruit(recruit);
  };

  useEffect(() => {
    setSelectedRecruit(clickedRecruit ? [clickedRecruit] : []);
  }, [clickedRecruit]);

  //진행방식 핸들러
  const handleClickMethod = (method) => {
    setClickedMethod(method);
  };

  useEffect(() => {
    setSelectedMethod(clickedMethod ? [clickedMethod] : []);
  }, [clickedMethod]);

  console.log(clickedSkills);
  console.log(clickedCity);
  console.log(clickedRecruit);
  console.log(clickedMethod);

  //단어 길이 ...표현하는 함수
  const EllipsisText = ({ text, maxLength }) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
      if (text.length > maxLength) {
        setDisplayText(`${text.substring(0, maxLength)}...`);
      }
    }, [text, maxLength]);

    return <span>{displayText}</span>;
  };

  // Ref 디폴트값 null로 지정
  const skillRef = useRef(null);
  const cityRef = useRef(null);
  const recruitRef = useRef(null);
  const methodRef = useRef(null);

  useEffect(() => {
    // 특정 영역 외 클릭 시 발생하는 이벤트
    function handleFocus(e) {
      if (
        skillRef.current &&
        !skillRef.current.contains(e.target) &&
        cityRef.current &&
        !cityRef.current.contains(e.target) &&
        recruitRef.current &&
        !recruitRef.current.contains(e.target) &&
        methodRef.current &&
        !methodRef.current.contains(e.target)
      ) {
        // isVisible = false 만들어주기
        setSkillVisible(false);
        setCityVisible(false);
        setMethodVisible(false);
        setRecruitVisible(false);
      }
    }
    // 이벤트 리스너에 handleFocus 함수 등록
    document.addEventListener("mouseup", handleFocus);
    return () => {
      document.removeEventListener("mouseup", handleFocus);
    };
  }, [skillRef, cityRef, recruitRef, methodRef]);

  const [searchPostResult, setSearchPostResult] = useState([]);

  useEffect(() => {
    const searchPosts = async () => {
      try {
        const params = {
          recruit_type: clickedRecruit,
          study_method: clickedMethod,
          study_location: clickedCity,
          skill_no: clickedSkills,
        };

        const areAnyParamsNonNull = Object.values(params).some(
          (value) => value !== null
        );

        // 선택된 값이 하나도 없거나 두 개 이상인 경우에도 요청을 보냄
        if (areAnyParamsNonNull) {
          const response = await usersUserinfoAxios.get("/getSelectedList", {
            params: params,
          });

          console.log("검색 결과 확인:", response.data);
          setSearchPostResult(response.data);
        } else {
          console.log("검색할 파라미터가 없습니다.");
          setSearchPostResult([]); // 검색할 파라미터가 없을 때 결과를 초기화하거나 원하는 동작을 수행
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    // searchPosts 함수 호출
    searchPosts();
  }, [clickedRecruit, clickedMethod, clickedCity, clickedSkills]);

  /////////////////////////////////////////////////////////////////////

  // 게시물의 좋아요 상태를 토글하는 함수
  const toggleLike = (post_no) => {
    setLike((prevLike) => {
      // 이전 상태를 복사하여 새로운 객체를 생성
      const updatedLike = { ...prevLike };
      // 좋아요 상태를 토글
      updatedLike[post_no] = !updatedLike[post_no];
      return updatedLike;
    });
  };

  // 좋아요 버튼을 클릭했을 때 호출되는 함수
  const handleHeartButtonClick = (e, post_no) => {
    e.stopPropagation();
    console.log("HeartButton Clicked");
    // 좋아요 상태를 토글하는 함수 호출
    toggleLike(post_no);
  };

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
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const fetchLike = async (post_no) => {
    try {
      const response = await usersUserinfoAxios.post(
        `/likesUpdate?user_no=${userData.user_no}&post_no=${post_no}`,
        {
          is_liked: isLiked,
        }
      );
      const updatedLike = await usersUserinfoAxios.get(
        `/liked_studies/${userData.user_no}`
      );
      setZzimUser(updatedLike.data);

      setLikes(response.data);
      console.log("찜하기데이터: " + response.data);
    } catch (error) {
      console.error("Failed to fetch like data.", error);
    }
  };

  const handleLikeButton = (post_no) => {
    fetchLike(post_no);
  };

  const [zzimUser, setZzimUser] = useState([]);

  const Zzim = async (user_no) => {
    try {
      const response = await usersUserinfoAxios.get(
        `/liked_studies/${userData.user_no}`
      );
      setZzimUser(response.data);
      console.log("찜!!!! data:", response.data);
    } catch (error) {
      console.error("찜 데이터를 불러오는 데 실패했습니다.", error);
      console.log(user_no);
    }
  };

  useEffect(() => {
    // 직접적으로 Zzim을 호출하지 않도록 주의
    // 대신에 별도의 함수를 정의하고 여기에서 호출
    const fetchZzimData = async () => {
      await Zzim(userData.user_no);
    };

    // 함수 호출
    fetchZzimData();
  }, [userData.user_no]);

  // 나머지 코드는 zzimUser를 사용한 부분입니다.
  const updatedBoards = boards.map((board) => {
    // zzimUser가 비어있는지 확인 후 조건을 걸어줌
    if (zzimUser.length > 0) {
      const isZzim = zzimUser.some((zzim) => board.post_no === zzim.post_no);

      console.log(isZzim);

      return {
        ...board,
        isZzim, // 혹은 isLiked 같은 상태를 추가하고 나중에 사용할 수 있도록 함
      };
    } else {
      return board; // zzimUser가 비어있으면 보드를 그대로 반환
    }
  });

  ///////////////////////////////////////////////
  const [profile, setProfile] = useState(false);
  const [profileUserNo, setProfileUserNo] = useState(null);
  return (
    <div className="Welcome">
      <div className="banner">
        <div className="banner_all">{!profile && <KakaoMap />}</div>
      </div>
      <br />
      <br />
      <br />
      <main className="main_board_list">
        <div className="toggle_section">
          <div className="category_section">
            <div className="category_section_set">
              <div className="all_toggle">
                <div className="all_toggle_2">
                  <div className="all_toggle_3">
                    <button
                      className="region_toggle_button"
                      type="button"
                      aria-expanded={isSkillVisible ? "true" : "false"}
                      onClick={() => toggleContentSkill("")}
                    >
                      {clickedSkills.length <= 0 ? (
                        "기술스택"
                      ) : (
                        <EllipsisText
                          text={clickedSkills
                            .map(
                              (skillNo) =>
                                skills.find(
                                  (skill) => skill.skill_no === skillNo
                                )?.skill_name
                            )
                            .join(", ")}
                          maxLength={8}
                        />
                      )}
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        class="css-8mmkcg"
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </button>
                  </div>

                  <div>
                    <button
                      className="region_toggle_button"
                      type="button"
                      aria-expanded={isCityVisible ? "true" : "false"}
                      onClick={() => toggleContentCity("")}
                    >
                      {clickedCity ? (
                        <EllipsisText text={clickedCity} maxLength={4} />
                      ) : (
                        "지역"
                      )}
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        class="css-8mmkcg"
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </button>
                  </div>

                  <div>
                    <button
                      className="region_toggle_button"
                      type="button"
                      aria-expanded={isMethodVisible ? "true" : "false"}
                      onClick={() => toggleContentMethod("")}
                    >
                      {clickedMethod ? (
                        <EllipsisText text={clickedMethod} maxLength={4} />
                      ) : (
                        "진행방식"
                      )}
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        class="css-8mmkcg"
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </button>
                  </div>

                  <div>
                    <button
                      className="region_toggle_button"
                      type="button"
                      aria-expanded={isRecruitVisible ? "true" : "false"}
                      onClick={() => toggleContentRecruit("")}
                    >
                      {clickedRecruit ? (
                        <EllipsisText text={clickedRecruit} maxLength={4} />
                      ) : (
                        "모집구분"
                      )}
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        class="css-8mmkcg"
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="search_container">
              <img className="search_img" src={SearchIcon} alt="search_icon" />
              <input
                placeholder="제목, 글 내용을 검색"
                class="searchInput"
                type="text"
                value={keyword}
                onChange={(e) => searchItems(e.target.value)}
              ></input>
            </div>
          </div>

          {/* 진행방식 */}
          <div ref={methodRef}>
            <div
              id="region_section"
              className={
                isMethodVisible ? "method-content active" : "method-content"
              }
            >
              {isMethodVisible && (
                <div className="region_section">
                  <ul className="region_seoul">
                    {methods.map((method) => (
                      <li
                        key={method}
                        className={`seoulToggle ${
                          clickedMethod.includes(method) ? "clicked" : ""
                        }`}
                        onClick={() => {
                          toggleContentMethod(method);
                          handleClickMethod(method);
                          setMethodVisible(true);
                        }}
                      >
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 모집구분 */}
          <div ref={recruitRef}>
            <div
              id="region_section"
              className={
                isRecruitVisible ? "recruit-content active" : "recruit-content"
              }
            >
              {isRecruitVisible && (
                <div className="region_section">
                  <ul className="region_seoul">
                    {recruits.map((recruit) => (
                      <li
                        key={recruit}
                        className={`seoulToggle ${
                          clickedRecruit.includes(recruit) ? "clicked" : ""
                        }`}
                        onClick={() => {
                          toggleContentRecruit(recruit);
                          handleClickRecruit(recruit);
                          setRecruitVisible(true);
                        }}
                      >
                        {recruit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 지역 */}
          <div ref={cityRef}>
            <div
              id="region_section"
              className={isCityVisible ? "city-content active" : "city-content"}
            >
              {isCityVisible && (
                <div className="region_section">
                  <ul className="region_seoul">
                    {cities.map((city) => (
                      <li
                        key={city}
                        className={`seoulToggle ${
                          clickedCity.includes(city) ? "clicked" : ""
                        }`}
                        onClick={() => {
                          toggleContentCity(city);
                          handleClickCity(city);
                          setCityVisible(true);
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 기술스택 */}
          <div ref={skillRef}>
            <div
              id="region_section"
              className={
                isSkillVisible ? "skill-content active" : "skill-content"
              }
            >
              {isSkillVisible && (
                <div className="region_section">
                  <ul className="skill">
                    {skills.map((skill) => (
                      <li
                        key={skill.skill_no}
                        className={`skillToggle ${
                          clickedSkills.includes(skill) ? "clicked" : ""
                        }`}
                        onClick={() => {
                          toggleContentSkill(skill);
                          handleClickSkill(skill);
                          setSkillVisible(true);
                        }}
                      >
                        <img
                          className="skill_logo"
                          src={`${process.env.PUBLIC_URL}/img/${skill.skill_name}.png`}
                          alt="skillLogo"
                        />
                        <span className="skill_text">{skill.skill_name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="selected">
                    <ul className="selected_1">
                      {Array.isArray(selectedSkill) &&
                      selectedSkill.length > 0 ? (
                        selectedSkill.map((selectedSkillItem, index) => (
                          <li key={index} className="selected_2">
                            <span className="selected_text">
                              {
                                skills.find(
                                  (skill) =>
                                    skill.skill_no === selectedSkillItem
                                )?.skill_name
                              }
                            </span>
                            <img
                              src={DeleteIcon}
                              className="delete_img"
                              alt="deleteButton"
                              onClick={() =>
                                handleClickSkill(selectedSkillItem)
                              }
                            />
                          </li>
                        ))
                      ) : (
                        // 그렇지 않으면 선택된 값이 없음을 나타내는 메시지 표시
                        <p>선택된 값이 없습니다.</p>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ul className="board_box_section">
          {keyword.length > 1 ? (
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
                        <div className="heart_button_container">
                          <HeartButton
                            className="heart_button"
                            like={updatedBoards.isZzim}
                            onClick={(e) => {
                              e.preventDefault(); // 기본 동작 막기 (링크 이동 방지)
                              e.stopPropagation(); // 이벤트 전파 방지
                              console.log("HeartButton Clicked");
                              handleHeartButtonClick(e, board.post_no);
                            }}
                          />
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
                      <ul className="skill_icon_section">
                        {board.studyPostWithSkills.map((skill, index) => (
                          <li key={index}>{skill.skill_name.skill_name}</li>
                        ))}
                      </ul>
                      <div className="board_content_border"></div>
                      <section className="board_info_section">
                        <div className="board_info_left">
                          <div className="user_profile_img">
                            {board.user_profile && (
                              <img
                                className="user_img"
                                width="30px"
                                height="30px"
                                src={`data:image/jpeg;base64,${board.user_profile}`}
                                alt="Profile"
                              />
                            )}
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
            updatedBoards.map((board) => (
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
                    {/* <p>{board.post_no}</p> */}
                    <div className="study_sort_badge">
                      <div className="study_sort_badge_content">
                        {board.recruit_type}
                      </div>

                      <div className="heart_button_container">
                        <HeartButton
                          className="heart_button"
                          like={board.isZzim}
                          onClick={(e) => {
                            e.preventDefault(); // 기본 동작 막기 (링크 이동 방지)
                            e.stopPropagation(); // 이벤트 전파 방지
                            console.log("HeartButton Clicked");
                            handleHeartButtonClick(e, board.post_no);
                            handleLikeButton(board.post_no);
                            console.log("제발 " + board.post_no);
                          }}
                        />
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
                    <ul className="skill_icon_section">
                      {board.studyPostWithSkills.map((skill, index) => (
                        <li key={index}>{skill.skill_name}</li>
                      ))}
                    </ul>
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
                            onClick={(e) => {
                              e.preventDefault(); // 기본 동작 막기 (링크 이동 방지)
                              e.stopPropagation(); // 이벤트 전파 방지

                              // 클릭한 유저의 user_no를 상태에 저장
                              const clickedUserNo = board.user_no;

                              // 모달 열기 및 user_no 전달
                              setProfileUserNo(clickedUserNo);
                              setProfile(!profile);
                            }}
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
      </main>
      {profile && (
        <Modal closeModal={() => setProfile(!profile)}>
          <ProfileModal
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            userNo={profileUserNo}
          />
        </Modal>
      )}
    </div>
  );
}

export default MainContent;
