import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <div className="mobile-header">
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <div
          className="logo-container"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Super Admin Logo" style={{ height: "50px", objectFit: "contain" }} />
        </div>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Super Admin</h2>
          <button className="close-sidebar" onClick={closeSidebar}>
            ×
          </button>
        </div>

        <Link to="/" onClick={closeSidebar}>Dashboard</Link>
        <Link to="/admins" onClick={closeSidebar}>Admins</Link>
        <Link to="/supervisors" onClick={closeSidebar}>Supervisors</Link>
        <Link to="/employees" onClick={closeSidebar}>Employees</Link>
        <Link to="/products" onClick={closeSidebar}>Products</Link>
        <Link to="/CreateProducts" onClick={closeSidebar}>Create Product</Link>
      

        <button className="logout" onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}>Sign Out</button>
      </div>
    </>
  );
};
export default Sidebar;