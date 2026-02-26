import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({ phone: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate a small delay for better UX
        setTimeout(() => {
            if (formData.phone === "0000000000" && formData.password === "superadmin") {
                const dummyUser = {
                    user_id: "super-admin-001",
                    phone: "0000000000",
                    role: "admin",
                    name: "Super Admin"
                };
                localStorage.setItem("token", "dummy-super-admin-token");
                localStorage.setItem("user", JSON.stringify(dummyUser));
                setLoading(false);
                toast.success("Logged in successfully!");
                navigate("/");
            } else {
                toast.error("Invalid phone number or password.");
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Super Admin Login</h2>
                <p>Welcome back! Please enter your details.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
