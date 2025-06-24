// src/pages/NewRecordPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createRecord } from "../services/recordService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/NewRecordPage.css";

const NewRecordPage = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState({
    name: "",
    date: null,
  });

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleDateChange = (selectedDate) => {
    setRecord({ ...record, date: selectedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...record,
        date: record.date?.toISOString().split("T")[0], // convert to yyyy-mm-dd
      };
      await createRecord(payload);
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

        <DatePicker
          selected={record.date}
          onChange={handleDateChange}
          placeholderText="Pick a date"
          className="new-record-input"
          dateFormat="yyyy-MM-dd"
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
