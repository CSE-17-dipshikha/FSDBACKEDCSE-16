const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Student data
let students = [
    {
        id: 101,
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        branch: "CSE",
        semester: 3,
        mobile: "9876543210"
    }
];

// Home
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// GET - All students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// GET - Student by ID
app.get("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST - Add student
app.post("/api/students", (req, res) => {
    const { id, name, email, branch, semester, mobile } = req.body;

    if (!id || !name || !email || !branch || !semester || !mobile) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingStudent = students.find(s => s.id === Number(id));

    if (existingStudent) {
        return res.status(400).json({
            message: "Student ID already exists"
        });
    }

    const newStudent = {
        id: Number(id),
        name,
        email,
        branch,
        semester: Number(semester),
        mobile
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update student
app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, branch, semester, mobile } = req.body;

    student.name = name;
    student.email = email;
    student.branch = branch;
    student.semester = Number(semester);
    student.mobile = mobile;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE - Delete student
app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

// Server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});