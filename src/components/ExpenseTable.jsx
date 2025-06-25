// import React from "react";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import Swal from "sweetalert2";
// import "../styles/DataTable.css";

// const ExpenseTable = ({ data = [], onDelete, donationTotal = 0, recordId }) => {
//   const navigate = useNavigate();

//   const totalExpense = data.reduce((acc, item) => acc + Number(item.amount), 0);
//   const walletRemaining = donationTotal - totalExpense;

//   const formatRupee = (amount) => `Rs. ${amount}/-`;

//   const handleAddExpense = () => {
//     navigate(`/add-expense/${recordId}`);
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();

//     // Header: EXPENSIFY
//     doc.setFontSize(20);
//     doc.setFont("helvetica", "bold");
//     doc.text("EXPENSIFY", 105, 15, { align: "center" });

//     // Subheading: Expense Report
//     doc.setFontSize(14);
//     doc.setFont("helvetica", "normal");
//     doc.text("Expense Report", 14, 25);

//     // Table Data
//     const tableColumn = ["Sr No", "Notes", "Date", "Amount"];

//     let tableRows;

//     if (data.length) {
//       tableRows = data.map((expense, index) => [
//         index + 1,
//         expense.notes,
//         new Date(expense.date).toLocaleDateString("en-GB"),
//         formatRupee(expense.amount),
//       ]);
//     } else {
//       // Centered "No data available" row with colspan
//       tableRows = [
//         [
//           {
//             content: "No data available",
//             colSpan: 4,
//             styles: {
//               halign: "center",
//               fontStyle: "italic",
//               textColor: [100],
//             },
//           },
//         ],
//       ];
//     }

//     autoTable(doc, {
//       startY: 30,
//       head: [tableColumn],
//       body: tableRows,
//       styles: {
//         halign: "center",
//         valign: "middle",
//       },
//     });

//     const summaryY = doc.lastAutoTable.finalY + 10;

//     // Show summary only if there's data
//     if (data.length) {
//       doc.setFontSize(12);
//       doc.setTextColor(0);
//       doc.text(`Total Spent: ${formatRupee(totalExpense)}`, 14, summaryY);
//       doc.text(
//         `Total Collected: ${formatRupee(donationTotal)}`,
//         14,
//         summaryY + 7
//       );
//       doc.text(
//         `Wallet Remaining: ${formatRupee(walletRemaining)}`,
//         14,
//         summaryY + 14
//       );
//     }

//     // Footer
//     const pageHeight = doc.internal.pageSize.height;
//     doc.setTextColor(150); // Grey
//     doc.setFontSize(10);
//     doc.text("Expensify", 14, pageHeight - 30);
//     doc.text("Developed by Bukhari Aliaakib", 14, pageHeight - 25);
//     doc.text("aliaakibbukhari1@gmail.com", 14, pageHeight - 20);
//     doc.text("+91 63535 56477", 14, pageHeight - 15);

//     doc.save("expense-report.pdf");
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to delete this entry?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         onDelete && onDelete(id);
//         Swal.fire("Deleted!", "The expense has been deleted.", "success");
//       }
//     });
//   };

//   return (
//     <div className="datatable-container">
//       <div className="datatable-header">
//         <button className="add-data-btn" onClick={handleAddExpense}>
//           + Add Expense
//         </button>
//         <button className="download-btn" onClick={handleDownloadPDF}>
//           📄 Download PDF
//         </button>
//       </div>

//       {/* Table View for Desktop */}
//       <table className="datatable-table">
//         <thead>
//           <tr>
//             <th>Sr No</th>
//             <th>Notes</th>
//             <th>Date</th>
//             <th>Expense</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="datatable-empty">
//                 No expenses found.
//               </td>
//             </tr>
//           ) : (
//             data.map((expense, index) => (
//               <tr key={expense._id || expense.id}>
//                 <td>{index + 1}</td>
//                 <td>{expense.notes}</td>
//                 <td>{new Date(expense.date).toLocaleDateString("en-GB")}</td>
//                 <td>{formatRupee(expense.amount)}</td>
//                 <td>
//                   <button
//                     className="datatable-delete-btn"
//                     onClick={() => handleDelete(expense._id || expense.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Card View for Mobile */}
//       <div className="datatable-cards">
//         {data.length === 0 ? (
//           <div className="datatable-empty">No expenses found.</div>
//         ) : (
//           data.map((expense, index) => (
//             <div
//               key={expense._id || expense.id}
//               className="datatable-card" // ❌ Removed 'clickable-card'
//               // ❌ Removed onClick
//             >
//               <div>
//                 <strong>Sr No:</strong> {index + 1}
//               </div>
//               <div>
//                 <strong>Notes:</strong> {expense.notes}
//               </div>
//               <div>
//                 <strong>Date:</strong>{" "}
//                 {new Date(expense.date).toLocaleDateString("en-GB")}
//               </div>
//               <div>
//                 <strong>Expense:</strong> {formatRupee(expense.amount)}
//               </div>
//               <div className="card-actions">
//                 <button
//                   className="datatable-delete-btn"
//                   onClick={() => handleDelete(expense._id || expense.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="datatable-total">
//         Total Spent: {formatRupee(totalExpense)}
//       </div>
//       <div className="datatable-total">
//         Total Collected: {formatRupee(donationTotal)}
//       </div>
//       <div className="datatable-total">
//         Wallet Remaining: {formatRupee(walletRemaining)}
//       </div>
//     </div>
//   );
// };

// export default ExpenseTable;


import React from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import "../styles/DataTable.css";

const ExpenseTable = ({ data = [], onDelete, donationTotal = 0, recordId }) => {
  const navigate = useNavigate();

  const totalExpense = data.reduce((acc, item) => acc + Number(item.amount), 0);
  const walletRemaining = donationTotal - totalExpense;

  // Totals by payment mode
  const totalByMode = {
    online: 0,
    cash: 0,
    cheque: 0,
  };

  data.forEach((item) => {
    const mode = item.paymentMode?.trim().toLowerCase();
    if (totalByMode[mode] !== undefined) {
      totalByMode[mode] += Number(item.amount);
    }
  });

  const formatRupee = (amount) => `Rs. ${amount}/-`;

  const handleAddExpense = () => {
    navigate(`/add-expense/${recordId}`);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Header: EXPENSIFY
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("EXPENSIFY", 105, 15, { align: "center" });

    // Subheading: Expense Report
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Expense Report", 14, 25);

    // Table Data
    const tableColumn = ["Sr No", "Notes", "Date", "Amount", "Payment Mode"];
    let tableRows;

    if (data.length) {
      tableRows = data.map((expense, index) => [
        index + 1,
        expense.notes,
        new Date(expense.date).toLocaleDateString("en-GB"),
        formatRupee(expense.amount),
        expense.paymentMode || "N/A",
      ]);
    } else {
      tableRows = [
        [
          {
            content: "No data available",
            colSpan: 5,
            styles: {
              halign: "center",
              fontStyle: "italic",
              textColor: [100],
            },
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

    const summaryY = doc.lastAutoTable.finalY + 10;

    if (data.length) {
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Total Spent: ${formatRupee(totalExpense)}`, 14, summaryY);
      doc.text(`Total Collected: ${formatRupee(donationTotal)}`, 14, summaryY + 7);
      doc.text(`Wallet Remaining: ${formatRupee(walletRemaining)}`, 14, summaryY + 14);

      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(
        `Online Purse: ${formatRupee(totalByMode.online)} | Cash Purse: ${formatRupee(
          totalByMode.cash
        )} | Cheque Purse: ${formatRupee(totalByMode.cheque)}`,
        14,
        summaryY + 22
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

    doc.save("expense-report.pdf");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete && onDelete(id);
        Swal.fire("Deleted!", "The expense has been deleted.", "success");
      }
    });
  };

  return (
    <div className="datatable-container">
      <div className="datatable-header">
        <button className="add-data-btn" onClick={handleAddExpense}>
          + Add Expense
        </button>
        <button className="download-btn" onClick={handleDownloadPDF}>
          📄 Download PDF
        </button>
      </div>

      {/* Table View for Desktop */}
      <table className="datatable-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Notes</th>
            <th>Date</th>
            <th>Expense</th>
            <th>Payment Mode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="datatable-empty">
                No expenses found.
              </td>
            </tr>
          ) : (
            data.map((expense, index) => (
              <tr key={expense._id || expense.id}>
                <td>{index + 1}</td>
                <td>{expense.notes}</td>
                <td>{new Date(expense.date).toLocaleDateString("en-GB")}</td>
                <td>{formatRupee(expense.amount)}</td>
                <td>{expense.paymentMode || "N/A"}</td>
                <td>
                  <button
                    className="datatable-delete-btn"
                    onClick={() => handleDelete(expense._id || expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Card View for Mobile */}
      <div className="datatable-cards">
        {data.length === 0 ? (
          <div className="datatable-empty">No expenses found.</div>
        ) : (
          data.map((expense, index) => (
            <div key={expense._id || expense.id} className="datatable-card">
              <div>
                <strong>Sr No:</strong> {index + 1}
              </div>
              <div>
                <strong>Notes:</strong> {expense.notes}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(expense.date).toLocaleDateString("en-GB")}
              </div>
              <div>
                <strong>Expense:</strong> {formatRupee(expense.amount)}
              </div>
              <div>
                <strong>Payment Mode:</strong> {expense.paymentMode || "N/A"}
              </div>
              <div className="card-actions">
                <button
                  className="datatable-delete-btn"
                  onClick={() => handleDelete(expense._id || expense.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totals Section */}
      <div className="datatable-total">Total Spent: {formatRupee(totalExpense)}</div>
      <div className="datatable-total">Total Collected: {formatRupee(donationTotal)}</div>
      <div className="datatable-total">Wallet Remaining: {formatRupee(walletRemaining)}</div>
      <div
        className="datatable-total"
        style={{ fontSize: "12px", color: "gray", marginTop: "4px" }}
      >
        Online Purse: {formatRupee(totalByMode.online)} | Cash Purse:{" "}
        {formatRupee(totalByMode.cash)} | Cheque Purse:{" "}
        {formatRupee(totalByMode.cheque)}
      </div>
    </div>
  );
};

export default ExpenseTable;
