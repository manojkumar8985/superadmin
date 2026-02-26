import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";
import foodIllustration from "../assets/image.jpg";

const Login = () => {
    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            if (
                formData.phone === "0000000000" &&
                formData.password === "superadmin"
            ) {
                toast.success("Logged in successfully!");
                navigate("/");
            } else {
                toast.error("Invalid phone or password");
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div
            className="login-wrapper"
            style={{
                backgroundImage: `url(${foodIllustration})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <div className="wrapper-overlay"></div>

            {/* LEFT SIDE */}
            <div
                className="login-left"
            >
                <div className="left-content">
                    <h1>Food Admin Dashboard</h1>
                    <p>
                        Manage orders, restaurants & earnings efficiently with powerful
                        analytics.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="login-right">
                <div className="login-card">
                    <h2>Welcome back 👋</h2>
                    <p className="subtitle">Login to continue</p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* <span className="forgot">Forgot Password?</span> */}
                </div>
            </div>
        </div>
    );
};

export default Login;