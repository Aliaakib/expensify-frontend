import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name =
        "The name field is required and should contain only letters.";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // ✅ Allow special characters like @ in password
    if (!/^.{6,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setErrors({ form: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register Now</h2>

        {errors.form && <p className="error-message">{errors.form}</p>}

        {/* Name */}
        <div className={`input-icon ${errors.name ? "input-error" : ""}`}>
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        {errors.name && <div className="validation-msg">{errors.name}</div>}

        {/* Email */}
        <div className={`input-icon ${errors.email ? "input-error" : ""}`}>
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="email"
            name="email"
            placeholder="E-Mail Address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <div className="validation-msg">{errors.email}</div>}

        {/* Phone */}
        <div className={`input-icon ${errors.phone ? "input-error" : ""}`}>
          <FontAwesomeIcon icon={faPhone} />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        {errors.phone && <div className="validation-msg">{errors.phone}</div>}

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

        {/* Confirm Password */}
        <div
          className={`input-icon ${
            errors.confirmPassword ? "input-error" : ""
          }`}
        >
          <FontAwesomeIcon icon={faLock} />
          <input
            type={formData.showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={formData.showPassword ? faEyeSlash : faEye}
            onClick={togglePassword}
            className="eye-icon"
          />
        </div>
        {errors.confirmPassword && (
          <div className="validation-msg">{errors.confirmPassword}</div>
        )}

        {/* Submit */}
        <button type="submit" className="register-btn">
          Register
        </button>

        {/* Login Link */}
        <p className="login-redirect">
          Already registered?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
