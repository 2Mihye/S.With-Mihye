import { useEffect, useState } from 'react';
import axios from 'axios';
import usersUserinfoAxios from '../../token/tokenAxios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams, BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyButton() {
  const { post_no } = useParams();
  const [notice, setNotice] = useState({
    post_no: `${post_no}`,
    user_no: '',
    notice_title: '',
    notice_content: '',
    notice_password: '',
  });
  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      // 토큰이 없으면 함수 실행 중단
      try {
        // 서버에 사용자 정보를 가져오는 요청
        const response = await usersUserinfoAxios.get('/users/userinfo');
        const userNo = response.data.user_no;
        setUserData((prevUserData) => ({
          ...prevUserData,
          user_no: userNo,
        }));
        setNotice((prevUserData) => ({
          // setNotice의 user_no에 받아온 userNo 값을 넣어줌
          ...prevUserData,
          user_no: userNo,
        }));
      } catch (error) {
        //console.error("Failed to fetch user data.", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    //e 자리값 밑에 target
    const { name, value } = e.target;
    setNotice((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await usersUserinfoAxios.post(
        `/studyRoom/create/StudyNoticeMoment/${post_no}`,
        notice,
        {
          withCredentials: true,
        }
      );
      console.log(userData.user_no);
      console.log(notice.post_no);

      setNotice(response.data);
    } catch (error) {
      console.log('시패' + userData.user_no);
      console.log(notice.post_no);
      console.error('데이터 저장 불가', error);
    }
  };

  return (
    <div>
      <Button className="btn" variant="outline-primary" onClick={handleShow}>
        공지글+
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <input
              type="hidden"
              name="post_no"
              value={post_no}
              onChange={handleInputChange}
            />
            <input
              type="hidden"
              name="user_no"
              value={userData.user_no}
              onChange={handleInputChange}
            />
            공지글 제목 :
            <input
              type="text"
              name="notice_title"
              value={notice.notice_title}
              onChange={handleInputChange}
              required
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          내용 :
          <input
            className="textInput"
            type="text"
            name="notice_content"
            value={notice.notice_content}
            onChange={handleInputChange}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          비밀번호(숫자4자리)
          <input
            type="password"
            name="notice_password"
            maxLength="4"
            minLength="4"
            value={notice.notice_password}
            onChange={handleInputChange}
          />
          <Button className="." variant="secondary" onClick={handleSave}>
            저장
          </Button>
          <Button
            className="btn_close"
            variant="secondary"
            onClick={handleClose}
          >
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default MyButton;
