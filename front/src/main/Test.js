import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import { logout, isTokenAvailable } from "../token/tokenAxios";
import { useNavigate } from "react-router-dom";
import usersUserinfoAxios from "../token/tokenAxios";
import Modal from "./Modal";
import "../css/Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "./Dropdown";
import AlarmModal from "./AlarmModal";

export default function Test() {
  const [alarm, setAlarm] = useState(false);
  const [alarmUserNo, setAlarmUserNo] = useState(null);
  return (
    <Modal>
      <AlarmModal
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        userNo={alarmUserNo}
        closeModal={() => setAlarm(!alarm)}
      />
    </Modal>
  );
}
