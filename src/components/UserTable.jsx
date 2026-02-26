import { useNavigate } from "react-router-dom";

const UserTable = ({ users, onDelete, type }) => {
  const navigate = useNavigate();

  const getReferralLabel = () => {
    if (type === "admin") return "Supervisors";
    if (type === "supervisor") return "Employees";
    if (type === "employee") return "Customers";
    return "Refers";
  };

  const getReferralCount = (user) => {
    if (type === "admin") return user.supervisor_count || user.supervisors?.length || user.children?.length || 0;
    if (type === "supervisor") return user.employee_count || user.employees?.length || user.children?.length || 0;
    if (type === "employee") return user.customer_count || user.customers?.length || user.children?.length || 0;
    return 0;
  };

  const handleRowClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="table-responsive">
      <table className="user-table">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Earnings</th>
            <th>{getReferralLabel()}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.user_id}
              onClick={() => handleRowClick(user.user_id)}
              style={{ cursor: "pointer", transition: "background-color 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>₹{user.earnings || 0}</td>
              <td>{getReferralCount(user)}</td>
              <td>
                <div className="action-buttons">
                  <button onClick={(e) => { e.stopPropagation(); onDelete(user.user_id); }} className="delete-btn" style={{ color: "white" }}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;