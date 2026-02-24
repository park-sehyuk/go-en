import React from "react";
import { Link } from "react-router-dom";
import "./SignupPage.css"; // 전용 CSS 임포트

const SignupPage = () => {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">회원가입</h2>
        <form>
          <div className="signup-field">
            <label>이름</label>
            <input className="signup-input" type="text" />
          </div>
          <div className="signup-field">
            <label>이메일</label>
            <input className="signup-input" type="email" />
          </div>
          <div className="signup-field">
            <label>비밀번호</label>
            <input className="signup-input" type="password" />
          </div>
          <button className="signup-button">계정 생성</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
          이미 계정이 있나요?{" "}
          <Link to="/login" style={{ color: "#0052cc" }}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
