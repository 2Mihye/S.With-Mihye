import usersUserinfoAxios from "../token/tokenAxios";
import { useState, useEffect } from "react";

export default function AlarmModal({ userNo }) {
  const [alarmUser, setAlarmUser] = useState("");
  const fetchUserData = async () => {
    try {
      const response = await usersUserinfoAxios.get(`/users/info/${userNo}`);
      setAlarmUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data.", error);
    }
  };

  useEffect(() => {
    if (userNo) {
      fetchUserData(userNo);
    }
  }, [userNo]);

  return (
    <section className="vh-100">
      <div className="container py-1 h-100">
        <div className="row d-flex justify-content-center align-items-center h-10">
          <p>알람함</p>
        </div>
      </div>
    </section>
  );
}
