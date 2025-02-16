import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Banner.css";
import mainLogo from "../assets/mainLogo.png";

const Banner = () => {
  const navigate = useNavigate();

  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  const checkAccessToken = async (
    setUserId,
    setUserNickname,
    setUserStatus
  ) => {
    const token = localStorage.getItem("token");
    //console.log(token);
    if (!token) return; // 토큰이 없으면 검증하지 않음
    else {
      try {
        const response = await fetch(`${address}/verify`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 형식으로 토큰 전송
          },
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
          setUserId(result.user.userId);
          setUserNickname(result.user.userNickname);
          setUserStatus(result.user.userStatus);
        }
      } catch (error) {
        console.error("토큰 검증 중 오류 발생:", error);
        localStorage.removeItem("token");
      }
    }
  };
  useEffect(() => {
    checkAccessToken(setUserId, setUserNickname, setUserStatus);
  }, []);

  return (
    <header className="banner">
      <div
        className="main-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={mainLogo} alt="Chicly Logo" />
      </div>
      <nav className="banner-nav">
        <ul>
          <li className="menu-item">
            CHICLY
            <ul className="sub-menu">
              <li onClick={() => navigate("/about")}>소개</li>
              <li onClick={() => navigate("/organization")}>조직도</li>
              <li onClick={() => navigate("/location")}>오시는 길</li>
              <li onClick={() => navigate("/history")}>연혁</li>
            </ul>
          </li>
          <li className="menu-item">
            NOTICE
            <ul className="sub-menu">
              <li
                onClick={() => navigate("/notice")}
                style={{ cursor: "pointer" }}
              >
                공지사항
              </li>
              <li
                onClick={() => navigate("/calendar")}
                style={{ cursor: "pointer" }}
              >
                학사 일정
              </li>
            </ul>
          </li>
          <li className="menu-item">
            COMMUNITY
            <ul className="sub-menu">
              <li
                onClick={() => navigate("/freeboard")}
                style={{ cursor: "pointer" }}
              >
                자유게시판
              </li>
              <li>비밀게시판</li>
            </ul>
          </li>
          <li className="menu-item">
            RECRUIT
            <ul className="sub-menu">
              <li>지원하기</li>
            </ul>
          </li>
          <li className="banner-login" onClick={() => navigate("/login")}>
            LOGIN
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Banner;
