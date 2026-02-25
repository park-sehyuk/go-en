import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeName = (e) => setName(e.target.value);

  const onJoin = async (e) => {
    // form의 기본 새로고침 방지
    e.preventDefault();
    try {
      const res = await fetch("/api/user/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        let message = "회원가입에 실패했습니다.";

        const data = await res.json();
        if (data?.message) message = data.message;

        alert(message);
        return;
      }
      navigate("/login");
    } catch (e) {
      console.error("signup save failed:", e);
      alert("회원가입에 실패했습니다. 입력값을 확인해주세요.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">회원가입</h2>
        <form onSubmit={onJoin}>
          <div className="signup-field">
            <label>이름</label>
            <input
              className="signup-input"
              type="text"
              value={name}
              onChange={handleChangeName}
            />
          </div>
          <div className="signup-field">
            <label>이메일</label>
            <input
              className="signup-input"
              type="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="signup-field">
            <label>비밀번호</label>
            <input
              className="signup-input"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
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
