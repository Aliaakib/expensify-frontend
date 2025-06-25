// import React, { useState, useEffect } from "react";
// import "../styles/Navbar.css";
// import { useNavigate, useLocation, Link } from "react-router-dom";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [hideNavbar, setHideNavbar] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, [location]);

//   // Scroll detection logic
//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY && currentScrollY > 60) {
//         setHideNavbar(true); // scroll down
//       } else {
//         setHideNavbar(false); // scroll up
//       }

//       lastScrollY = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleToggle = () => setIsOpen(!isOpen);
//   const handleLinkClick = () => setIsOpen(false);
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setIsOpen(false);
//     navigate("/");
//   };
//   const handleLogin = () => {
//     setIsOpen(false);
//     navigate("/login");
//   };
//   const handleLogoClick = () => {
//     navigate(isLoggedIn ? "/dashboard" : "/");
//   };

//   return (
//     <nav className={`exp-navbar ${hideNavbar ? "navbar-hidden" : ""}`}>
//       <div
//         className="exp-navbar-brand"
//         onClick={handleLogoClick}
//         style={{ cursor: "pointer" }}
//       >
//         Expensify
//       </div>

//       <div
//         className={`exp-navbar-toggle ${isOpen ? "open" : ""}`}
//         onClick={handleToggle}
//       >
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>

//       <ul className={`exp-navbar-links ${isOpen ? "open" : ""}`}>
//         {isLoggedIn ? (
//           <>
//             <li>
//               <Link to="/dashboard" onClick={handleLinkClick}>
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <button onClick={handleLogout}>Logout</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/about" onClick={handleLinkClick}>
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" onClick={handleLinkClick}>
//                 Contact
//               </Link>
//             </li>
//             <li>
//               <button onClick={handleLogin}>Login</button>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate("/");
  };
  const handleLogin = () => {
    setIsOpen(false);
    navigate("/login");
  };
  const handleLogoClick = () => {
    navigate(isLoggedIn ? "/dashboard" : "/");
  };

  return (
    <nav className={`exp-navbar ${hideNavbar ? "navbar-hidden" : ""}`}>
      <div className="exp-navbar-top">
        <div className="exp-navbar-brand" onClick={handleLogoClick}>
          Expensify
        </div>
        <div
          className={`exp-navbar-toggle ${isOpen ? "open" : ""}`}
          onClick={handleToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <ul className={`exp-navbar-links ${isOpen ? "open" : ""}`}>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/dashboard" onClick={handleLinkClick}>
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/about" onClick={handleLinkClick}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
            <li>
              <button onClick={handleLogin}>Login</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
