import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchStudent from "./components/SearchStudents";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Get all students
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setMessage("Backend server is not running");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add / Update student
  const saveStudent = async (student) => {
    try {
      let response;

      if (editStudent) {
        response = await fetch(
          `http://localhost:5000/api/students/${editStudent.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
          }
        );
      } else {
        response = await fetch("http://localhost:5000/api/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setMessage(data.message);
      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      setMessage(data.message);
      fetchStudents();
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  // Search by ID or Name
  const filteredStudents = students.filter((student) => {
    const value = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(value) ||
      student.id.toString().includes(value)
    );
  });

  return (
    <div className="container">
      <header>
        <h1>Student Management System</h1>
        <p>React + Node.js + Express</p>
      </header>

      {message && (
        <div className="message">
          {message}
          <button onClick={() => setMessage("")}>X</button>
        </div>
      )}

      <StudentForm
        onSave={saveStudent}
        editStudent={editStudent}
        onCancel={() => setEditStudent(null)}
      />

      <SearchStudent search={search} setSearch={setSearch} />

      <StudentList
        students={filteredStudents}
        onEdit={setEditStudent}
        onDelete={deleteStudent}
      />
    </div>
  );
}

export default App;