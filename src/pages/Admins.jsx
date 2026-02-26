import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import UserTable from "../components/UserTable";

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    API.get("/admin/all-admins").then(res => {
      setAdmins(res.data.data);
    });
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await API.delete(`/admin/delete-user/${id}`);
        toast.success("Admin deleted successfully");
        fetchAdmins();
      } catch (error) {
        console.error("Error deleting admin:", error);
        toast.error("Failed to delete admin");
      }
    }
  };

  return (
    <div>
      <h2 style={{ color: "black" }}>Admins</h2>
      <UserTable users={admins} onDelete={deleteUser} type="admin" />
    </div>
  );
};

export default Admins;