import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import Products from "./pages/Products";
import Admins from "./pages/Admins";
import Supervisors from "./pages/Supervisors";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="container">
                <Sidebar />
                <div className="main">
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/CreateProducts" element={<CreateProduct />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/admins" element={<Admins />} />
                      <Route path="/supervisors" element={<Supervisors />} />
                      <Route path="/employees" element={<Employees />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;