import { useEffect, useState } from "react";

function StudentForm({ onSave, editStudent, onCancel }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    branch: "CSE",
    semester: "",
    mobile: "",
  });

  useEffect(() => {
    if (editStudent) {
      setForm(editStudent);
    } else {
      setForm({
        id: "",
        name: "",
        email: "",
        branch: "CSE",
        semester: "",
        mobile: "",
      });
    }
  }, [editStudent]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.id ||
      !form.name ||
      !form.email ||
      !form.branch ||
      !form.semester ||
      !form.mobile
    ) {
      alert("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      alert("Mobile number must be 10 digits");
      return;
    }

    if (form.semester < 1 || form.semester > 8) {
      alert("Semester must be between 1 and 8");
      return;
    }

    onSave({
      ...form,
      id: Number(form.id),
      semester: Number(form.semester),
    });

    if (!editStudent) {
      setForm({
        id: "",
        name: "",
        email: "",
        branch: "CSE",
        semester: "",
        mobile: "",
      });
    }
  };

  return (
    <div className="form-box">
      <h2>{editStudent ? "Update Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="Student ID"
          value={form.id}
          onChange={handleChange}
          disabled={!!editStudent}
        />

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <select
          name="branch"
          value={form.branch}
          onChange={handleChange}
        >
          <option value="CSE">CSE</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          min="1"
          max="8"
          value={form.semester}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          maxLength="10"
          value={form.mobile}
          onChange={handleChange}
        />

        <button type="submit">
          {editStudent ? "Update Student" : "Add Student"}
        </button>

        {editStudent && (
          <button
            type="button"
            className="cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default StudentForm;