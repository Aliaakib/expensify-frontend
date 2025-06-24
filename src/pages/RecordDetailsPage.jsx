import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "../components/DataTable";
import ExpenseTable from "../components/ExpenseTable";
import "../styles/RecordDetailsPage.css";
import { FaArrowLeft } from "react-icons/fa";

const RecordDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [activeTab, setActiveTab] = useState("donation");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/records/${id}`,
          config
        );

        setRecord(response.data);
      } catch (err) {
        setError("Failed to load record.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id, refresh]);

  if (loading)
    return (
      <div className="loader-wrapper">
        <span className="loader"></span>
      </div>
    );

  if (error) return <p className="error">{error}</p>;
  if (!record) return <p>No record found.</p>;

  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/records/${id}/expenses/${expenseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  return (
    <div className="record-detail-container">
      <div className="record-detail-header">
        <button
          onClick={() => navigate("/dashboard")}
          className="record-back-btn"
        >
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back to Records
        </button>
        <h2>Record: {record.name || `Missing name (ID: ${id})`}</h2>
      </div>

      <div className="record-tabs">
        <button
          className={`record-tab-btn ${
            activeTab === "donation" ? "active" : ""
          }`}
          onClick={() => setActiveTab("donation")}
        >
          Data
        </button>
        <button
          className={`record-tab-btn ${
            activeTab === "expense" ? "active" : ""
          }`}
          onClick={() => setActiveTab("expense")}
        >
          Expenses
        </button>
      </div>

      <div className="record-tab-content">
        {activeTab === "donation" ? (
          <DataTable
            data={record.data || []}
            recordId={id}
            onDataUpdated={() => setRefresh((prev) => !prev)}
          />
        ) : (
          <ExpenseTable
            data={record.expenses || []}
            recordId={id}
            onDelete={handleDeleteExpense}
            donationTotal={(record.data || []).reduce(
              (acc, d) => acc + Number(d.amount),
              0
            )}
          />
        )}
      </div>
    </div>
  );
};

export default RecordDetailPage;
