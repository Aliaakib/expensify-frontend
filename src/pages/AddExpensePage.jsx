import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm";
import axios from "axios";
import { toast } from "react-toastify";

const AddExpensePage = () => {
  const { id } = useParams(); // ✅ Get the record ID
  const navigate = useNavigate();

  // ✅ This is fine
  const handleAddExpense = async (expenseData) => {
    const token = localStorage.getItem("token");
    await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/records/${id}/add-expense`,
      expenseData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Expense added successfully!");
    navigate(`/record/${id}`);
  };

  return <AddExpenseForm onAdd={handleAddExpense} />;
};

export default AddExpensePage;
