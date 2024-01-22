import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

import "../css/Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  // const authContext = useAuth();
  // const isAuthenticated = authContext.isAuthenticated;

  // function logout() {
  //   authContext.logout();
  // }
  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="nav_section">
            <div className="navbar-brand_font">
              <a className="nav-link" href="/">
                S.With
              </a>
            </div>

            <ul className="navbar-nav_2">
              <li className="nav-item">
                <div className="write">
                  <div className="write_1">
                    <a className="nav-link" href="/new">
                      <img
                        className="write_img"
                        src={process.env.PUBLIC_URL + "../img/writing.png"}
                        alt="newwriting"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div className="alarm">
                  <div className="alarm_1">
                    <img
                      className="alarm_img"
                      src={process.env.PUBLIC_URL + "../img/bell.png"}
                      alt="alarm"
                    />
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div className="profile">
                  <div className="profile_1">
                    <a className="nav-link" href="/login">
                      <img
                        className="login_img"
                        src={process.env.PUBLIC_URL + "../img/login.png"}
                        alt="login"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div className="profile">
                  <div className="profile_1">
                    <img
                      className="profile_img"
                      src={process.env.PUBLIC_URL + "../img/girl.png"}
                      alt="profile"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
