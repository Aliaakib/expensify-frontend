import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/AddDataForm.css";

const AddDataForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    paymentMode: "",
    date: null,
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (selectedDate) => {
    setFormData({ ...formData, date: selectedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, date: formData.date?.toISOString().split("T")[0] });
    setFormData({ name: "", paymentMode: "", date: null, amount: "" });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add Your Data</h2>

      <input
        type="text"
        name="name"
        className="form-input"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select
        name="paymentMode"
        className="form-input"
        value={formData.paymentMode}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Mode of Payment
        </option>
        <option value="cash">Cash</option>
        <option value="online">Online</option>
        <option value="cheque">Cheque</option>
      </select>

      <DatePicker
        selected={formData.date}
        onChange={handleDateChange}
        placeholderText="Pick a date"
        className="form-input"
        dateFormat="yyyy-MM-dd"
        required
      />

      <input
        type="number"
        name="amount"
        className="form-input"
        placeholder="Amount (₹)"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <button type="submit" className="form-btn">
        Add Data
      </button>
    </form>
  );
};

export default AddDataForm;
