import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Register.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  const togglePassword = () =>
    setFormData({ ...formData, showPassword: !formData.showPassword });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "The email or phone number is required.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "The password field is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = await loginUser({
        identifier: formData.identifier,
        password: formData.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setErrors({ form: "Login failed. Check your credentials." });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form login-form">
        <h2>Login</h2>

        {errors.form && <p className="error-message">{errors.form}</p>}

        {/* Email / Phone */}
        <div className={`input-icon ${errors.identifier ? "input-error" : ""}`}>
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            name="identifier"
            placeholder="Email or Phone"
            value={formData.identifier}
            onChange={handleChange}
          />
        </div>
        {errors.identifier && (
          <div className="validation-msg">{errors.identifier}</div>
        )}

        {/* Password */}
        <div className={`input-icon ${errors.password ? "input-error" : ""}`}>
          <FontAwesomeIcon icon={faLock} />
          <input
            type={formData.showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={formData.showPassword ? faEyeSlash : faEye}
            onClick={togglePassword}
            className="eye-icon"
          />
        </div>
        {errors.password && (
          <div className="validation-msg">{errors.password}</div>
        )}

        {/* Submit */}
        <button type="submit" className="register-btn">
          Login
        </button>

        {/* Forgot Password */}
        <p className="login-redirect forgot-link">
          <span
            className="login-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </p>

        {/* Register link */}
        <p className="login-redirect">
          Not registered?{" "}
          <span className="login-link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
