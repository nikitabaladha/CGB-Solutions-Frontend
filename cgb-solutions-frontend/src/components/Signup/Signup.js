// src/components/Signup.js
import React, { useState } from "react";
import "./Signup.css";
import postAPI from "../../Api/axiosPost.js";

const Signup = ({ onLoginClick, onSuccess }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await postAPI("/signup", formData, false);

      if (!response.hasError) {
        alert(response.data.message);
        console.log("Signup successful Message:", response.data.message);
        onSuccess();
      } else {
        setGeneralError(response.data.message);
        console.error("Signup Error 1:", response.data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Signup Error 2:", error.response.data.message);

        setGeneralError(error.response.data.message);
      } else {
        console.error("Signup Error 3:", error);

        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">User Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            value={formData.role}
            onChange={handleChange}
            id="role"
            name="role"
            className="form-control"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="subadmin">Sub-Admin</option>
          </select>
        </div>

        {generalError && <p className="error">{generalError}</p>}
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
        <div className="mt-2">
          Already have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={onLoginClick}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
