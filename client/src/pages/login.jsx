

import React from "react";
import LoginForm from "../components/loginForm";
import bgImage from "../assets/page.png";
import "../css/login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-box">
          <h2>Login</h2>
          <p>Welcome onboard with us!</p>
          <LoginForm />
          <div className="register">
            Don’t have an account? <a href="/register">Register here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
