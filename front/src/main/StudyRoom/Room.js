import Header from '../Header';
import usersUserinfoAxios from '../../token/tokenAxios';

import React, { useState, useEffect } from 'react';
import { useParams, BrowserRouter, Routes, Route } from 'react-router-dom';
import NoticeModal from './NoticeModal';

function StudyRoom() {
  const [userData, setUserData] = useState('');
  const [notice, setNotice] = useState({
    post_no: '',
    user_no: '',
    notice_title: '',
    notice_content: '',
    notice_password: '',
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 서버에 사용자 정보를 가져오는 요청
        const response = await usersUserinfoAxios.get('/users/userinfo');
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.error('Failed to fetch user data.', error);
      }
    };

    fetchUserData();
  }, []);

  const { post_no } = useParams(); // 동적 라우트 매개변수 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyRoomPages, setStudyRoomPages] = useState([]);

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const response = await usersUserinfoAxios.get(`/study_room/${post_no}`);
        setStudyRoomPages(response.data);
        console.log(studyRoomPages);
      } catch (error) {
        console.log('Error fetching study detail: ', error);
      }
    };

    fetchStudyDetail();
  }, [post_no]); // post_no가 변경될 때마다 실행

  return (
    <div>
      <Header />
      <div>
        <h4>Notice</h4>
        {/*post_no, user_no */}
        <p>하냥이의 번호는 = {post_no}</p>
        <div>
          <NoticeModal />
        </div>
      </div>
    </div>
  );
}

export default StudyRoom;
