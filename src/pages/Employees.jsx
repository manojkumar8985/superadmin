import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import UserTable from "../components/UserTable";

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        API.get("/admin/all-employees").then(res => {
            setEmployees(res.data.data || []);
        });
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await API.delete(`/admin/delete-user/${id}`);
                toast.success("Employee deleted successfully");
                fetchEmployees();
            } catch (error) {
                console.error("Error deleting employee:", error);
                toast.error("Failed to delete employee");
            }
        }
    };

    return (
        <div className="users-page">
            <h2 style={{ color: "black" }}>Employees</h2>
            <UserTable users={employees} onDelete={deleteUser} type="employee" />
        </div>
    );
};

export default Employees;
