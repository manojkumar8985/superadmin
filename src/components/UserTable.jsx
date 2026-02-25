const UserTable = ({ users, onDelete, type }) => {
  const getReferralLabel = () => {
    if (type === "admin") return "Supervisors";
    if (type === "supervisor") return "Employees";
    if (type === "employee") return "Customers";
    return "Refers";
  };

  const getReferralCount = (user) => {
    if (type === "admin") return user.supervisor_count || 0;
    if (type === "supervisor") return user.employee_count || 0;
    if (type === "employee") return user.customer_count || 0;
    return 0;
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
            <tr key={user.user_id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>₹{user.earnings || 0}</td>
              <td>{getReferralCount(user)}</td>
              <td>
                <div className="action-buttons">
                  {/* <button className="edit-btn">Edit</button> */}
                  <button onClick={() => onDelete(user.user_id)} className="delete-btn">Delete</button>
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