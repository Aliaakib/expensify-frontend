// src/pages/NewRecordPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createRecord } from "../services/recordService";
import "../styles/NewRecordPage.css";

const NewRecordPage = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState({ name: "", date: "" });

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRecord(record);
      toast.success("Record created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Record creation failed:", err);
      toast.error("Failed to create record");
    }
  };

  return (
    <div className="new-record-container">
      <form onSubmit={handleSubmit} className="new-record-form">
        <div className="new-record-header">
          <h2>Create New Record</h2>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Record Name"
          value={record.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={record.date}
          onChange={handleChange}
          required
        />
        <button type="submit" className="new-record-btn">
          Create Record
        </button>
      </form>
    </div>
  );
};

export default NewRecordPage;
