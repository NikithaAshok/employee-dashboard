import { useNavigate } from "react-router-dom";
import { logout } from "../utils/storage";
import EmployeeTable from "../components/employees/EmployeeTable";
import { useState } from "react";
import { getEmployees, saveEmployees } from "../utils/storage";
import EmployeeForm from "../components/employees/EmployeeForm";

function Dashboard() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState(getEmployees());
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const total = employees.length;
  const active = employees.filter((e) => e.isActive).length;
  const inactive = total - active;

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());

    const matchesGender = !genderFilter || emp.gender === genderFilter;

    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "active"
          ? emp.isActive
          : !emp.isActive;

    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAddEmployee = () => {
    setShowForm(true);
  };

  const handleSaveEmployee = (employee) => {
    let updated;

    if (editingEmployee) {
      updated = employees.map((e) => (e.id === employee.id ? employee : e));
    } else {
      updated = [...employees, employee];
    }

    setEmployees(updated);
    saveEmployees(updated);
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updated = employees.filter((e) => e.id !== id);
      setEmployees(updated);
      saveEmployees(updated);
    }
  };

  const handleEditEmployee = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  };

  const handleToggleStatus = (id) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    );

    setEmployees(updated);
    saveEmployees(updated);
  };

  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <h2>Employee Dashboard</h2>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </header>

      {/* Content */}
      <div style={styles.container}>
        <h3>Dashboard Overview</h3>

        <div style={styles.cards}>
          <div style={styles.card}>Total Employees: {total}</div>
          <div style={styles.card}>Active: {active}</div>
          <div style={styles.card}>Inactive: {inactive}</div>
        </div>
        <div style={styles.filters}>
          <input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            style={styles.input}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.input}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="print-area">
          <EmployeeTable
            employees={filteredEmployees}
            onAdd={handleAddEmployee}
            onDelete={handleDeleteEmployee}
            onEdit={handleEditEmployee}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
      {showForm && (
        <EmployeeForm
          existing={editingEmployee}
          onSave={handleSaveEmployee}
          onCancel={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
        />
      )}
    </div>
  );
}

const styles = {
  header: {
    background: "#4f46e5",
    color: "#fff",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logout: {
    background: "#fff",
    color: "#4f46e5",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
  container: {
    padding: "24px",
  },
  cards: {
    display: "flex",
    gap: "16px",
    marginTop: "16px",
  },
  filters: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
    marginBottom: "16px",
  },
  input: {
    padding: "8px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    minWidth: "150px",
  },
};

export default Dashboard;
