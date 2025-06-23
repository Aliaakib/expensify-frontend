// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoutes";

// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import NewRecordPage from "./pages/NewRecordPage";
// import RecordDetailsPage from "./pages/RecordDetailsPage";
// import AddDataPage from "./pages/AddDataPage";
// import AddExpensePage from "./pages/AddExpensePage";

// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import Footer from "./components/Footer";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <ToastContainer position="top-center" autoClose={3000} />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/about" element={<AboutPage />} />

//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />

//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/new-record"
//             element={
//               <ProtectedRoute>
//                 <NewRecordPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/record/:id"
//             element={
//               <ProtectedRoute>
//                 <RecordDetailsPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/record/:id/add-data"
//             element={
//               <ProtectedRoute>
//                 <AddDataPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="/add-expense/:id" element={<AddExpensePage />} />
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewRecordPage from "./pages/NewRecordPage";
import RecordDetailsPage from "./pages/RecordDetailsPage";
import AddDataPage from "./pages/AddDataPage";
import AddExpensePage from "./pages/AddExpensePage";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <ToastContainer position="top-center" autoClose={3000} />
        <main
          style={{
            flex: 1,
          }}
        >
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/new-record"
                element={
                  <ProtectedRoute>
                    <NewRecordPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/record/:id"
                element={
                  <ProtectedRoute>
                    <RecordDetailsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/record/:id/add-data"
                element={
                  <ProtectedRoute>
                    <AddDataPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/add-expense/:id" element={<AddExpensePage />} />
            </Routes>
          </div>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
