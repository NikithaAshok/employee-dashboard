function EmployeeTable({ employees, onAdd, onDelete, onEdit, onToggleStatus }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>Employees</h3>
        <button onClick={() => window.print()} style={styles.printBtn}>
          Print
        </button>
        <button onClick={onAdd} style={styles.addBtn}>
          + Add Employee
        </button>
      </div>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={styles.td}>{emp.id}</td>
                <td style={styles.td}>{emp.name}</td>
                <td style={styles.td}>{emp.gender}</td>
                <td style={styles.td}>
                  <label>
                    <input
                      type="checkbox"
                      checked={emp.isActive}
                      onChange={() => onToggleStatus(emp.id)}
                    />
                    {emp.isActive ? " Active" : " Inactive"}
                  </label>
                </td>
                <td style={styles.td}>
                  <button onClick={() => onEdit(emp)}>Edit</button>
                  <button onClick={() => onDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: "32px",
    background: "#fff",
    padding: "16px",
    borderRadius: "8px",
  },
  button: {
    marginRight: "6px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  addBtn: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
  printBtn: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "4px 12px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    verticalAlign: "middle",
  },
};

export default EmployeeTable;
