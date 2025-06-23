// src/pages/AddDataPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddDataForm from "../components/AddDataForm";
import { addDataToRecord } from "../services/dataService"; // API file

const AddDataPage = () => {
  const { id: recordId } = useParams();
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    try {
      await addDataToRecord(recordId, formData);
      toast.success("Data added successfully!");
      navigate(`/record/${recordId}`); // 👈 Go back to detail page
    } catch (err) {
      console.error("Error adding data:", err);
      toast.error("Failed to add data");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* <h2>Add Data to Record</h2> */}
      <AddDataForm onAdd={handleAdd} />
    </div>
  );
};

export default AddDataPage;
