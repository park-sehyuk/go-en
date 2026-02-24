import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userName = localStorage.getItem("userName") || "사용자";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo">
          Go-en
        </Link>
      </div>

      <div className="header-right">
        {isLoggedIn ? (
          <div className="user-info">
            <span className="user-name">{userName}님</span>
            <button className="logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link-btn">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
