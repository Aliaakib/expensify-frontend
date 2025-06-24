import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/AddDataForm.css";

const AddExpenseForm = ({ onAdd }) => {
  const [expense, setExpense] = useState({
    notes: "",
    date: null,
    amount: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleDateChange = (selectedDate) => {
    setExpense({ ...expense, date: selectedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onAdd) {
      await onAdd({
        ...expense,
        date: expense.date?.toISOString().split("T")[0],
      });
      setExpense({ notes: "", date: null, amount: "" });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      <input
        type="text"
        name="notes"
        className="form-input"
        placeholder="Notes"
        value={expense.notes}
        onChange={handleChange}
        required
      />

      <DatePicker
        selected={expense.date}
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
        value={expense.amount}
        onChange={handleChange}
        required
      />

      <button type="submit" className="form-btn">
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
