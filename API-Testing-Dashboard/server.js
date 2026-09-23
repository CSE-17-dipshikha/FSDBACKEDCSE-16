const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());


// PUBLIC FOLDER
app.use(express.static(__dirname + "/public"));


// Test API
app.get("/api", (req, res) => {
    res.json({
        message: "API is working"
    });
});


// Users
let users = [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahulsharma@gmail.com",
        college: "ABES EC",
        branch: "CSE",
        year: 3
    },
    {
        id: 3,
        name: "Rahul Kumar",
        email: "rahul@gmail.com",
        college: "ABES",
        branch: "CSE",
        year: 2
    }
];


// GET
app.get("/user", (req, res) => {
    res.json(users);
});


// GET BY ID
app.get("/user/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});


// POST
app.post("/user", (req, res) => {

    const newUser = {
        id: users.length > 0
            ? users[users.length - 1].id + 1
            : 1,

        name: req.body.name,
        email: req.body.email,
        college: req.body.college,
        branch: req.body.branch,
        year: req.body.year
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});


// PUT
app.put("/user/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.college = req.body.college || user.college;
    user.branch = req.body.branch || user.branch;
    user.year = req.body.year || user.year;

    res.json({
        message: "User updated successfully",
        user: user
    });
});


// DELETE
app.delete("/user/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(index, 1);

    res.json({
        message: "User deleted successfully",
        user: deletedUser[0]
    });
});


// SERVER
app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});