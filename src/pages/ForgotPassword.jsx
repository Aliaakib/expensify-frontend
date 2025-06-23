import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Register.css";
import { resetPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const togglePassword = () =>
    setFormData({ ...formData, showPassword: !formData.showPassword });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or phone is required.";
    } else if (
      !/^\S+@\S+\.\S+$/.test(formData.identifier) &&
      !/^\d{10}$/.test(formData.identifier)
    ) {
      newErrors.identifier = "Enter a valid email or 10-digit phone number.";
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@!#%&*]{6,}$/.test(formData.newPassword)
    ) {
      newErrors.newPassword =
        "Password must be at least 6 characters and include letters and numbers.";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await resetPassword(formData);
      setSubmitted(true);
      // toast.success("Password reset successfully.");
    } catch (err) {
      // toast.error(err.response?.data?.error || "Reset failed.");
      alert(err.response?.data?.error || "Reset failed.");
    }
  };

  // ⏳ Auto redirect to login after 5 seconds
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Reset Password</h2>

        {submitted ? (
          <>
            <p style={{ color: "green", textAlign: "center" }}>
              Your password has been reset successfully.
              <br />
              Redirecting to login...
            </p>
            <p className="login-redirect" style={{ marginTop: "20px" }}>
              <span className="login-link" onClick={() => navigate("/login")}>
                Login Now
              </span>
            </p>
          </>
        ) : (
          <>
            {/* Identifier */}
            <div
              className={`input-icon ${errors.identifier ? "input-error" : ""}`}
            >
              <FontAwesomeIcon icon={faEnvelope} />
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

            {/* New Password */}
            <div
              className={`input-icon ${
                errors.newPassword ? "input-error" : ""
              }`}
            >
              <FontAwesomeIcon icon={faLock} />
              <input
                type={formData.showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter New Password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={formData.showPassword ? faEyeSlash : faEye}
                onClick={togglePassword}
                className="eye-icon"
              />
            </div>
            {errors.newPassword && (
              <div className="validation-msg">{errors.newPassword}</div>
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
                placeholder="Confirm New Password"
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

            <button type="submit" className="register-btn">
              Reset Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
