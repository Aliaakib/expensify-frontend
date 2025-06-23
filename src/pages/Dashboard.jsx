import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRecords, deleteRecord } from "../services/recordService";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await getMyRecords();
      setRecords(res);
    } catch (err) {
      console.error("Failed to fetch records:", err);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/record/${id}`);
  };

  const handleNewRecord = () => {
    navigate("/new-record");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRecord(id);
        setRecords((prev) => prev.filter((record) => record._id !== id));
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete the record.", "error");
      }
    }
  };

  const filteredRecords = records.filter((record) => {
    const nameMatch = record.name?.toLowerCase().includes(searchTerm);
    const dateStr = new Date(record.date).toLocaleDateString("en-GB");
    const dateMatch = dateStr.includes(searchTerm);
    return nameMatch || dateMatch;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Records</h2>
        <button className="add-record-btn" onClick={handleNewRecord}>
          + New Record
        </button>
      </div>

      <div className="dashboard-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or date..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Table View */}
      <div className="dashboard-table">
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record, index) => (
                <tr key={record._id}>
                  <td onClick={() => handleRowClick(record._id)}>
                    {index + 1}
                  </td>
                  <td onClick={() => handleRowClick(record._id)}>
                    {record.name}
                  </td>
                  <td onClick={() => handleRowClick(record._id)}>
                    {new Date(record.date).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  {records.length === 0
                    ? "There are no existing records."
                    : "No matching records found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View */}
      <div className="dashboard-cards">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record, index) => (
            <div
              className="record-card clickable-card"
              key={record._id}
              onClick={() => handleRowClick(record._id)}
            >
              <div>
                <strong>Sr No:</strong> {index + 1}
              </div>
              <div>
                <strong>Name:</strong> {record.name}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(record.date).toLocaleDateString("en-GB")}
              </div>
              <div className="card-actions">
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(record._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-records">
            {records.length === 0
              ? "There are no existing records."
              : "No matching records found."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
