import { useEffect, useState } from "react";
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
    await API.delete(`/admin/delete-user/${id}`);
    fetchAdmins();
  };

  return (
    <div>
      <h2 style={{color:"black"}}>Admins</h2>
      <UserTable users={admins} onDelete={deleteUser} type="admin" />
    </div>
  );
};

export default Admins;