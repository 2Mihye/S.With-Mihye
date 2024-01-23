import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "../css/RegisterUser.css";
import Required from "./img/required.png";
import sample6_execDaumPostcode from "./KakaoAddress";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);
  const [confirm, setConfirm] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const [swithUser, setNewUser] = useState({
    email: "",
    password: "",
    username: "",
    nickname: "",
    userprofile: "",
    useraddress: "",
    userintroduction: "",
    role: "",
  });

  const handleInputChange = (e) => {
    //e 자리값 밑에 target
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/mail",
        swithUser,
        {
          withCredentials: true,
        }
      );

      setConfirm(response.data.toString());
      //db에 이메일이 존재하면 alert 이미 존재하는 아이디입니다. else 사용가능한 아이디입니다.
      if (response.data !== "error") {
        console.log(response.data);
        console.log("서버 응답:", response);
        console.log("ok");
        alert("인증번호가 전송되었습니다.(사용가능)");
      } else {
        alert("이미 중복된 아이디입니다");
        console.log(response.data);
      }
    } catch (error) {
      console.error("이메일이 부적합합니다.", error);
    }
  };

  const handleConfirm = async () => {
    console.log("number:", number);
    console.log("confirm:", confirm);
    if (number === confirm) {
      alert("인증 완료, 사용가능한 이메일입니다.");
      setIsButtonDisabled(true);
      // 전송한 이메일 값을 a에 담아주기
    } else {
      alert("인증 번호가 다릅니다.");
      console.error("인증 실패");
    }
  };
  const handleNumberChange = (e) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        swithUser,
        {
          withCredentials: true,
        }
      );

      // 추가된 부분: 주소 값을 설정
      const address = document.getElementById("useraddress").value;
      setNewUser((prevUser) => ({ ...prevUser, useraddress: address }));

      //변경된 데이터 값 저장
      setData((prevUser) => [...prevUser, response.data]);

      //데이터 저장되고 나서 빈값으로 초기화 하길 원한다면  초기화도 진행!!
      setNewUser({
        email: "",
        password: "",
        username: "",
        nickname: "",
        userprofile: "",
        useraddress: "",
        userintroduction: "",
        role: "",
      });
      navigate("/"); // 이동 경로 수정
    } catch (error) {
      console.error("데이터가 부적합합니다.", error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewUser((prevUser) => ({ ...prevUser, userprofile: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Header />

      <br></br>
      <h1 className="title">회원가입</h1>
      <br></br>
      <h3 className="subTitle">회원가입후 S.With에 참여하세요</h3>
      <div className="container_register">
        <form className="m-5 mb-1">
          <div className="register_id m-3">
            <div className="two">
              <h4 className="s_text">
                아이디(email)
                <img src={Required} className="required_img" />
              </h4>
            </div>
            <label className="m-2"></label>
            <input
              className="textInput"
              type="text"
              name="email"
              value={swithUser.email}
              onChange={handleInputChange}
            />
            <button onClick={handleEmail}>이메일 인증하기</button>
            <br />
            <input
              type="text"
              name="number"
              value={number}
              onChange={handleNumberChange}
            />
            <button disabled={isButtonDisabled} onClick={handleConfirm}>
              인증확인
            </button>
          </div>
          <div className="register_id m-3">
            <div className="two">
              <h4 className="s_text">
                비밀번호(password)
                <img src={Required} className="required_img" />
              </h4>
            </div>
            <label className="m-2"></label>
            <input
              className="textInput"
              type="password"
              name="password"
              value={swithUser.password}
              autoComplete="off"
              onChange={handleInputChange}
            />
          </div>

          <div className="register_id m-3">
            <div className="two">
              <h4 className="s_text">
                이름(name)
                <img src={Required} className="required_img" />
              </h4>
            </div>
            <label className="m-2"></label>
            <input
              className="textInput"
              type="text"
              name="username"
              value={swithUser.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="register_id m-3">
            <div className="two">
              <h4 className="s_text">
                닉네임(nick name)
                <img src={Required} className="required_img" />
              </h4>
            </div>
            <label className="m-2"></label>
            <input
              className="textInput"
              type="text"
              name="nickname"
              value={swithUser.nickname}
              onChange={handleInputChange}
            />
          </div>
          <div className="register_id m-3">
            <div className="two">
              <h4 className="s_text">프로필 사진(profile image)</h4>
            </div>
            <label className="m-2"></label>
            <input
              className="image_input"
              type="file"
              accept="image/*" // 이미지 파일만 선택할 수 있도록 지정
              name="userprofile"
              onChange={(e) => handleImageChange(e)}
            />
            {/* 프로필 사진 미리보기를 위한 이미지 컨테이너 */}
            <div className="profile-image-container">
              {swithUser.userprofile && (
                <img
                  src={swithUser.userprofile}
                  alt="프로필 이미지"
                  className="profile-image"
                />
              )}
            </div>
          </div>
          <div className="register_id m-3">
            <div className="two">
              <h4 className="s_text">
                주소(address)
                <img src={Required} className="required_img" />
              </h4>
            </div>
            <label className="m-2"></label>
            <input type="text" id="useraddress" />
            <br />
            <input
              name="useraddress"
              className="textInput"
              type="button"
              value="주소 찾기"
              onClick={() => sample6_execDaumPostcode({ setNewUser })}
            />
          </div>

          <div className="register_id m-3">
            <div className="two">
              <h4 className="s_text">자기소개(self introduction)</h4>
            </div>
            <label className="m-2"></label>
            <input
              className="textInput"
              type="text"
              name="userintroduction"
              value={swithUser.userintroduction}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="role"
              value={swithUser.role}
              onChange={handleInputChange}
              hidden={true}
            />
          </div>
          <button
            onClick={handleAddUser}
            type="button"
            name="login"
            className="btn round"
            style={{
              backgroundColor: "#75ddff",
              width: "200px",
              height: "50px",
              margin: "10px",
              marginTop: "20px",
              marginBottom: "10px",
              borderRadius: "30px",
            }}
          >
            회원가입 완료
          </button>
        </form>
        <div className="login_sns">
          <button
            type="button"
            name="login"
            className="btn round"
            style={{
              backgroundColor: "#ffffb5",
              width: "150px",
              height: "50px",
              margin: "10px",
              marginTop: "20px",
              borderRadius: "30px",
            }}
          >
            카카오 로그인
          </button>

          <button
            type="button"
            name="login"
            className="btn round"
            style={{
              backgroundColor: "#ffffb5",
              width: "150px",
              height: "50px",
              margin: "10px",
              borderRadius: "30px",
            }}
          >
            Github 로그인
          </button>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
export default RegisterUser;
