// // src/components/AddDataForm.jsx
// import React, { useState } from "react";
// import "../styles/AddDataForm.css";

// const AddDataForm = ({ onAdd }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     paymentMode: "",
//     date: "",
//     amount: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAdd(formData);
//     setFormData({
//       name: "",
//       phone: "",
//       paymentMode: "",
//       date: "",
//       amount: "",
//     });
//   };

//   return (
//     <form className="form-container" onSubmit={handleSubmit}>
//       <h2>Add Your Data</h2>

//       <input
//         type="text"
//         name="name"
//         className="form-input"
//         placeholder="Enter Name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />

//       {/* Uncomment if phone is needed */}
//       {/* <input
//         type="tel"
//         name="phone"
//         className="form-input"
//         placeholder="Phone Number"
//         value={formData.phone}
//         onChange={handleChange}
//         required
//       /> */}

//       <select
//         name="paymentMode"
//         className="form-input"
//         value={formData.paymentMode}
//         onChange={handleChange}
//         required
//       >
//         <option value="" disabled>
//           Select Mode of Payment
//         </option>
//         <option value="cash">Cash</option>
//         <option value="online">Online</option>
//         <option value="cheque">Cheque</option>
//       </select>

//       <input
//         type="date"
//         name="date"
//         className="form-input"
//         value={formData.date}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="number"
//         name="amount"
//         className="form-input"
//         placeholder="Amount (₹)"
//         value={formData.amount}
//         onChange={handleChange}
//         required
//       />

//       <button type="submit" className="form-btn">
//         Add Data
//       </button>
//     </form>
//   );
// };

// export default AddDataForm;

import React, { useState } from "react";
import "../styles/AddDataForm.css";

const AddDataForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    paymentMode: "",
    date: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      phone: "",
      paymentMode: "",
      date: "",
      amount: "",
    });
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

      <input
        type="date"
        name="date"
        className="form-input"
        value={formData.date}
        onChange={handleChange}
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
