import { useState, useEffect } from 'react';

import { Route, useParams } from 'react-router-dom';
import usersUserinfoAxios from '../../token/tokenAxios';
import NoticeModal from './NoticeModal';
import 'bootstrap/dist/css/bootstrap.min.css';
//select
const Notice = () => {
  const { post_no } = useParams();
  const [userData, setUserData] = useState('');
  const [notice, setNotice] = useState({
    user_no: '',
    notice_title: '',
    notice_content: '',
    notice_date: '',
    notice_post_date: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div>
      <h4>Notice</h4>
      {/*post_no, user_no */}
      <p>하냥이의 번호는 = {post_no}</p>
      <div>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          +jjj
        </button>
      </div>
      {isModalOpen === true ? <NoticeModal /> : null}
    </div>
  );
};
export default Notice;
