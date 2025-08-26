
import React from "react";
import RegisterForm from "../components/RegisterForm";
import bgImage from "../assets/registerpage.png"; // use your background
import "../css/register.css"; // we'll create this

const Register = () => {
  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="register-glass">
        <h2 className="register-title">Create Account</h2>
        <RegisterForm />
        <p className="login-link">
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
