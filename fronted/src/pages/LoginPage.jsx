import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css"; // 전용 CSS 임포트

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <Link to="/" className="login-logo">
          Go-en
        </Link>
        <form className="login-form">
          <input type="email" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
          <button className="login-submit">로그인</button>
        </form>
        <div className="login-footer">
          처음이신가요? <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
