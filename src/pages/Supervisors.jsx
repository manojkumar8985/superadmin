import { useEffect, useState } from "react";
import API from "../services/api";
import UserTable from "../components/UserTable";

const Supervisors = () => {
    const [supervisors, setSupervisors] = useState([]);

    useEffect(() => {
        fetchSupervisors();
    }, []);

    const fetchSupervisors = () => {
        API.get("/admin/all-supervisors").then(res => {
            setSupervisors(res.data.data || []);
        });
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this supervisor?")) {
            try {
                await API.delete(`/admin/delete-user/${id}`);
                fetchSupervisors();
            } catch (error) {
                console.error("Error deleting supervisor:", error);
            }
        }
    };

    return (
        <div className="users-page">
            <h2 style={{color:"black"}}>Supervisors</h2>
            <UserTable users={supervisors} onDelete={deleteUser} type="supervisor" />
        </div>
    );
};

export default Supervisors;
