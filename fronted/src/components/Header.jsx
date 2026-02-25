import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location.pathname]);

  useEffect(() => {
    fetchUserName();
  }, [isLoggedIn]);

  const fetchUserName = async () => {
    if (!isLoggedIn) return;

    try {
      const res = await fetch("/api/user/name", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        setUserName("");
        return;
      }

      if (!res.ok) {
        throw new Error("failed to load user");
      }
      const data = await res.text();
      setUserName(data);
      localStorage.setItem("userName", data);
    } catch (e) {
      console.error("user info load failed:", e);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("logout failed:", e);
    } finally {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      setIsLoggedIn(false);
      setUserName("");
      navigate("/");
    }
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
            <button
              type="button"
              className="user-name logout-name-btn"
              onClick={handleLogout}
              title="클릭하면 로그아웃"
            >
              {(userName || "사용자")}님
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
