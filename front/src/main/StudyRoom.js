import Header from "./Header";
import usersUserinfoAxios from "../token/tokenAxios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function StudyRoom() {
  const { post_no } = useParams(); // 동적 라우트 매개변수 가져오기

  const [studyRoomPages, setStudyRoomPages] = useState([]);

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const response = await usersUserinfoAxios.get(`/study_room/${post_no}`);
        setStudyRoomPages(response.data);
        console.log(studyRoomPages);
      } catch (error) {
        console.log("Error fetching study detail: ", error);
      }
    };

    fetchStudyDetail();
  }, [post_no]); // post_no가 변경될 때마다 실행

  return (
    <div>
      <Header />
      {/*notice */}
      <div></div>

      {/*moment */}
      <div></div>
    </div>
  );
}

export default StudyRoom;
