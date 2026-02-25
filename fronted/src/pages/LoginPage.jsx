import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let message = "로그인에 실패했습니다.";

        const data = await res.json();
        if (data?.message) message = data.message;

        alert(message);
        return;
      }
      const data = await res.json();
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", data?.email || email);
      navigate("/");
    } catch (e) {
      console.error("login failed:", e);
      alert("로그인에 실패했습니다. 입력값을 확인해주세요.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Link to="/" className="login-logo">
          Go-en
        </Link>
        <form className="login-form" onSubmit={onLogin}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleChangePassword}
          />
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
