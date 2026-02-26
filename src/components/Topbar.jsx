import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate();

    return (
        <div className="topbar">
            <div className="profile">
                hello sir
            </div>
            <div
                className="logo-container"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
            >
                <img src={logo} alt="Super Admin Logo" style={{ height: "50px", objectFit: "contain" }} />
            </div>
            
        </div>
    );
};

export default Topbar;
