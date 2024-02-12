//존재하는 아이디인지,
//비밀번호 찾기는 이메일 넣으면 인증번호 발송하고,
//인증번호가 일치하면 비밀번호 알려줌
import { useState, useEffect } from "react";
import usersUserinfoAxios from "../token/tokenAxios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "../css/RegisterUser.css";

function FindUser() {
  const [number, setNumber] = useState(""); //보낸 난수
  const [confirm, setConfirm] = useState(""); //인증 input값
  const [confirmEmail, setConfirmEmail] = useState(false); //email input 값
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonDisabled2, setIsButtonDisabled2] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false); //email찾기 메세지 나타내는거
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //password 알려주기
  const [confirmPassword, setConfirmPassword] = useState("");
  const [swithUser, setSwithUser] = useState({
    email: "",
    username: "",
    password: "",
  }); //email값
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    //e 자리값 밑에 target
    const { name, value } = e.target;
    setSwithUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/userData");
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.error("failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, []);
  const handleFind = async (e) => {
    e.preventDefault();
    const { email } = swithUser;
    try {
      const response = await axios.post(
        "http://localhost:8080/users/ExistEmail",
        swithUser,
        {
          withCredentials: true,
        }
      );
      setConfirmEmail(response.data.toString());
      //db에 이메일이 존재하면
      if (response.data === "existsEmail") {
        setConfirmEmail("existsEmail");
      } else if (response.data !== "none") {
        setConfirmEmail("none");
      }
    } catch (error) {
      console.error("이메일이 부적합합니다.", error);
    }
    setIsMessageVisible(true);
  };
  //email
  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/findPassword",
        swithUser,
        {
          withCredentials: true,
        }
      );

      setConfirm(response.data.toString());
      alert("인증번호가 전송되었습니다.");

      console.log(response.data);
    } catch (error) {
      console.error("이메일이 부적합합니다.", error);
    }
  };

  const handleNumberChange = (e) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleConfirm = async () => {
    console.log("number:", number);
    console.log("confirm:", confirm);
    if (number === confirm) {
      alert("인증 완료.");
      setIsButtonDisabled(true);
      // 전송한 이메일 값을 a에 담아주기
    } else {
      alert("인증 번호가 다릅니다.");
      console.error("인증 실패");
    }
    setIsPasswordVisible(true);
  };
  const handleInputChange1 = (e) => {
    //e 자리값 밑에 target
    const { name, value } = e.target;

    setSwithUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  //password update button
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (isButtonDisabled2 === true && swithUser.password === confirmPassword) {
      try {
        //서버로 업데이트할 데이터 보내기
        const response = await usersUserinfoAxios.post(
          "http://localhost:8080/users/updatePassword",
          swithUser, //수정된 사용자 데이터 보내기
          {
            withCredentials: true,
          }
        );
        // 업데이트가 성공하면 서버에서 응답된 데이터를 받아와서 userData를 업데이트
        console.log("사용자 데이터 업데이트 성공");
        alert("비밀번호 수정이 완료되었습니다.");
      } catch (error) {
        console.error("수정 불가", error);
      }
    } else {
      alert("모든 인증을 확인해주세요");
    }
  };
  //password constraint
  const handleConfirmPassword = async (e) => {
    console.log("swithUser.password", swithUser.password);
    console.log("confirmPassword", confirmPassword);
    const passwordRegex =
      /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/;
    if (swithUser.password === confirmPassword) {
      // Check if the password meets the regex pattern
      if (passwordRegex.test(confirmPassword)) {
        alert("비밀번호가 일치하며 조건에 부합합니다.");
        setIsButtonDisabled2(true);
      } else {
        alert("비밀번호가 일치하지만 조건에 부합하지 않습니다.");
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  return (
    <div>
      <Header />

      <br></br>
      <div>
        <h1 className="title">아이디(email) 찾기</h1>
        <form className="m-5 mb-1">
          <div className="register_id m-3">
            <div className="two">
              <h4 className="s_text">찾을 Email을 입력하세요</h4>
            </div>
            <label className="m-2"></label>
            <input
              className="textInput"
              type="text"
              name="username"
              value={swithUser.username}
              onChange={handleInputChange}
              required
            />
            <button
              onClick={handleFind}
              className="btn round"
              style={{
                backgroundColor: "#ffffb5",
                width: "100px",
                height: "50px",
                margin: "10px",
                marginTop: "5px",
                borderRadius: "30px",
              }}
            >
              찾기
            </button>
            <p className={isMessageVisible ? "visible" : "hidden"}>
              {confirmEmail
                ? `${swithUser.email} 존재하는 이메일 입니다.`
                : `${swithUser.email} 존재하지 않는 이메일 입니다.`}
            </p>
          </div>
        </form>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div className="register_id ml-5">
          <div className="two">
            <h1 className="title">비밀번호 찾기</h1>
          </div>

          <h4 className="s_text_id">이메일을 입력하세요</h4>
          <label className="m-2"></label>

          <input
            className="textInput"
            type="text"
            name="email"
            value={swithUser.email}
            onChange={handleInputChange}
            required
          />
          <button
            onClick={handleEmail}
            className="btn round"
            style={{
              backgroundColor: "#ffffb5",
              width: "100px",
              height: "50px",
              margin: "10px",
              marginTop: "5px",
              borderRadius: "30px",
            }}
          >
            인증하기
          </button>
          <br />
          <input
            type="text"
            name="number"
            className="textInput_check"
            value={number}
            onChange={handleNumberChange}
          />
          <button
            disabled={isButtonDisabled}
            onClick={handleConfirm}
            className="btn round"
            style={{
              backgroundColor: "#ffffb5",
              width: "100px",
              height: "50px",
              margin: "10px",
              marginTop: "5px",
              borderRadius: "30px",
            }}
          >
            인증확인
          </button>
          <br />
        </div>
        <br />
        <br />
        <br />
        <div className={isPasswordVisible ? "visible" : "hidden"}>
          <h4>비밀번호 수정하기 </h4>
          <a>영문자,숫자,특수문자를 포함한 8자 이상의 비밀번호</a>
          <br />
          <input
            className="textInput"
            type="password"
            name="password"
            value={userData.password}
            autoComplete="off"
            onChange={handleInputChange1}
          />
          <br />
          <input
            className="textInput"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            autoComplete="off"
            onChange={handlePasswordChange}
          />
          <button
            disabled={isButtonDisabled2}
            onClick={handleConfirmPassword}
            className="btn round"
            style={{
              backgroundColor: "#ffffb5",
              width: "100px",
              height: "50px",
              margin: "10px",
              marginTop: "5px",
              borderRadius: "30px",
            }}
          >
            비밀번호 일치확인
          </button>
          <br />
          <button
            onClick={handleUpdatePassword}
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
            비밀번호 수정
          </button>
        </div>
      </div>
    </div>
  );
}
export default FindUser;
