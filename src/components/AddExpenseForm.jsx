// // src/components/AddExpenseForm.jsx
// import React, { useState } from "react";
// import "../styles/AddDataForm.css"; // Reusing AddDataForm styles

// const AddExpenseForm = ({ onAdd }) => {
//   const [expense, setExpense] = useState({
//     notes: "",
//     date: "",
//     amount: "",
//   });

//   const handleChange = (e) => {
//     setExpense({ ...expense, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (onAdd) {
//       await onAdd(expense);
//       setExpense({ notes: "", date: "", amount: "" }); // Clear form after submit
//     }
//   };

//   return (
//     <form className="form-container" onSubmit={handleSubmit}>
//       <h2>Add Expense</h2>

//       <input
//         type="text"
//         name="notes"
//         className="form-input"
//         placeholder="Notes"
//         value={expense.notes}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="date"
//         name="date"
//         className="form-input"
//         value={expense.date}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="number"
//         name="amount"
//         className="form-input"
//         placeholder="Amount (₹)"
//         value={expense.amount}
//         onChange={handleChange}
//         required
//       />

//       <button type="submit" className="form-btn">
//         Add Expense
//       </button>
//     </form>
//   );
// };

// export default AddExpenseForm;

import React, { useState } from "react";
import "../styles/AddDataForm.css";

const AddExpenseForm = ({ onAdd }) => {
  const [expense, setExpense] = useState({
    notes: "",
    date: "",
    amount: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onAdd) {
      await onAdd(expense);
      setExpense({ notes: "", date: "", amount: "" });
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

      <input
        type="date"
        name="date"
        className="form-input"
        value={expense.date}
        onChange={handleChange}
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
