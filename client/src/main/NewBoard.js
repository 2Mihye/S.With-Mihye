import React, { useState } from "react";
import Header from "./Header";
import "../css/NewBoard.css";

function NewBoard() {
  // const [selectedSkill, setselectedSkill] = useState([]);
  // const skills = ["Java", "Python"];

  const [selectedValue, setSelectedValue] = useState("");

  const options = ["옵션 1", "옵션 2", "옵션 3", "옵션 4"];

  // 옵션을 매핑하여 옵션 요소를 생성
  const dropdownOptions = options.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  // 선택된 값이 변경될 때 호출되는 함수
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Header />

      <h1 className="title">새 S.With 작성하기</h1>
      <div className="section_1">
        <section>
          <div className="post_1">
            <span className="post_1_title">1</span>
            <h2 className="post_title">S.With 기본 정보를 입력해주세요.</h2>
          </div>
          <ul className="dropdown_1">
            {/* 드롭다운 박스 */}
            <li className="dropdown_2">
              <select
                className="custom-dropdown"
                value={selectedValue}
                onChange={handleSelectChange}
                style={{ width: "300px", height: "40px" }}
              >
                <option value="" disabled>
                  기술스택을 선택하세요
                </option>
                {dropdownOptions}
              </select>
            </li>
            <li className="dropdown_2">
              <select
                className="custom-dropdown"
                value={selectedValue}
                onChange={handleSelectChange}
                style={{ width: "300px", height: "40px" }}
              >
                <option value="" disabled>
                  기술스택을 선택하세요
                </option>
                {dropdownOptions}
              </select>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default NewBoard;
