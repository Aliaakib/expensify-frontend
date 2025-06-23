import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { deleteData } from "../services/dataService";
import "../styles/DataTable.css";
import autoTable from "jspdf-autotable";

const DataTable = ({ data, recordId, onDataUpdated }) => {
  const navigate = useNavigate();

  // Total amount collected
  const total = data.reduce((acc, item) => acc + item.amount, 0);

  // Totals by payment mode
  const totalByMode = {
    online: 0,
    cash: 0,
    cheque: 0,
  };

  data.forEach((item) => {
    const mode = item.paymentMode?.trim().toLowerCase();
    if (totalByMode[mode] !== undefined) {
      totalByMode[mode] += item.amount;
    }
  });

  const handleAddData = () => {
    navigate(`/record/${recordId}/add-data`);
  };

  const handleDelete = async (dataId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteData(recordId, dataId);
        Swal.fire("Deleted!", "Data has been deleted.", "success");
        if (onDataUpdated) onDataUpdated();
      } catch (err) {
        Swal.fire("Error", "Failed to delete data", "error");
      }
    }
  };

  const formatRupee = (amount) => `Rs. ${amount}/-`;
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("EXPENSIFY", 105, 15, { align: "center" });

    // Subheading
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Data Record", 14, 25);

    const tableColumn = ["Sr No", "Name", "Payment Mode", "Date", "Amount"];

    // Define table rows
    let tableRows;

    if (data.length) {
      tableRows = data.map((record, index) => [
        index + 1,
        record.name,
        record.paymentMode,
        new Date(record.date).toLocaleDateString("en-GB"),
        formatRupee(record.amount),
      ]);
    } else {
      // Row with colspan to center the "No data available" message
      tableRows = [
        [
          {
            content: "No data available",
            colSpan: 5,
            styles: { halign: "center", fontStyle: "italic", textColor: [100] },
          },
        ],
      ];
    }

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: {
        halign: "center",
        valign: "middle",
      },
    });

    const finalY = doc.lastAutoTable.finalY || 40;

    // Only show totals if data exists
    if (data.length) {
      // Total Collected
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text(`Total Collected: ${formatRupee(total)}`, 14, finalY + 10);

      // Totals by payment mode
      doc.setFontSize(11);
      doc.setTextColor(100); // Grey
      doc.text(
        `Online: ${formatRupee(totalByMode.online)} | Cash: ${formatRupee(
          totalByMode.cash
        )} | Cheque: ${formatRupee(totalByMode.cheque)}`,
        14,
        finalY + 18
      );
    }

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setTextColor(150);
    doc.setFontSize(10);
    doc.text("Expensify", 14, pageHeight - 30);
    doc.text("Developed by Bukhari Aliaakib", 14, pageHeight - 25);
    doc.text("aliaakibbukhari1@gmail.com", 14, pageHeight - 20);
    doc.text("+91 63535 56477", 14, pageHeight - 15);

    doc.save("Data-Report.pdf");
  };

  return (
    <div className="datatable-container">
      <div className="datatable-header">
        <button className="add-data-btn" onClick={handleAddData}>
          + Add Data
        </button>
        <button className="download-btn" onClick={handleDownloadPDF}>
          📄 Download PDF
        </button>
      </div>

      {/* Desktop Table View */}
      <table className="datatable-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Mode of Payment</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="datatable-empty">
                No data found for this record.
              </td>
            </tr>
          ) : (
            data.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.paymentMode}</td>
                <td>{new Date(record.date).toLocaleDateString("en-GB")}</td>
                <td>{formatRupee(record.amount)}</td>
                <td>
                  <button
                    className="datatable-delete-btn"
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="datatable-cards">
        {data.length === 0 ? (
          <div className="datatable-empty">No data found for this record.</div>
        ) : (
          data.map((record, index) => (
            <div key={record._id} className="datatable-card">
              <div>
                <strong>Sr No:</strong> {index + 1}
              </div>
              <div>
                <strong>Name:</strong> {record.name}
              </div>
              <div>
                <strong>Payment Mode:</strong> {record.paymentMode}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(record.date).toLocaleDateString("en-GB")}
              </div>
              <div>
                <strong>Amount:</strong> {formatRupee(record.amount)}
              </div>
              <div className="card-actions">
                <button
                  className="datatable-delete-btn"
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
        )}
      </div>

      {/* Totals */}
      <div className="datatable-total">
        Total Collected: {formatRupee(total)}
        <div style={{ fontSize: "12px", color: "gray", marginTop: "4px" }}>
          Online: {formatRupee(totalByMode.online)} | Cash:{" "}
          {formatRupee(totalByMode.cash)} | Cheque:{" "}
          {formatRupee(totalByMode.cheque)}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
