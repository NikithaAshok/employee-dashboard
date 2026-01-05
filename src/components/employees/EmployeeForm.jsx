import { useState } from "react";

const states = ["Karnataka", "Tamil Nadu", "Kerala", "Maharashtra"];

function EmployeeForm({ onSave, onCancel, existing }) {
  const [name, setName] = useState(existing?.name || "");
  const [gender, setGender] = useState(existing?.gender || "");
  const [dob, setDob] = useState(existing?.dob || "");
  const [state, setState] = useState(existing?.state || "");
  const [isActive, setIsActive] = useState(existing?.isActive ?? true);
  const [image, setImage] = useState(existing?.image || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !gender || !dob || !state) {
      setError("All fields are required");
      return;
    }

    const employee = {
      id: existing?.id || "EMP" + Date.now(),
      name,
      gender,
      dob,
      state,
      isActive,
      image,
    };

    onSave(employee);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>{existing ? "Edit Employee" : "Add Employee"}</h3>

        {error && <p style={styles.error}>{error}</p>}

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          style={styles.input}
        />

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          style={styles.input}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
          }}
        />

        {image && <img src={image} alt="preview" width="80" />}

        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>

        <div style={styles.actions}>
          <button
            onClick={() => {
              setError("");
              onCancel();
            }}
          >
            Cancel
          </button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    width: "300px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
  },
  error: {
    color: "red",
  },
};

export default EmployeeForm;
