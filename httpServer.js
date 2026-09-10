import http from "http";

const userData = [
    {
        id: 101,
        name: "Abc",
        email: "cm@abes.ac.in"
    },
    {
        id: 102,
        name: "Aman",
        email: "aman@gmail.com"
    }
];

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    // GET /msg
    if (url === "/msg" && method === "GET") {

        res.end("This is welcome message from server");

    }

    // GET /sys
    else if (url === "/sys" && method === "GET") {

        res.end("This is system information");

    }

    // GET /data
    else if (url === "/data" && method === "GET") {

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(userData));

    }

    // POST /create
    else if (url === "/create" && method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            if (body.length === 0) {
                res.statusCode = 400;
                return res.end("Please send JSON data");
            }

            try {

                const newData = JSON.parse(body);

                const newUserData = {
                    id: newData.id,
                    name: newData.name,
                    email: newData.email
                };

                userData.push(newUserData);

                res.statusCode = 201;
                res.end("Data entered successfully");

            } catch (error) {

                res.statusCode = 400;
                res.end("Invalid JSON data");

            }
        });
    }

    // GET /users
    else if (url === "/users" && method === "GET") {

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(userData));

    }

    // GET /users/:id
    else if (url.startsWith("/users/") && method === "GET") {

        const id = url.split("/")[2];

        const user = userData.find((u) => u.id == id);

        if (!user) {
            res.statusCode = 404;
            return res.end("User Not Found");
        }

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(user));

    }

    // DELETE /delete/:id
    else if (url.startsWith("/delete/") && method === "DELETE") {

        const id = url.split("/")[2];

        const userIndex = userData.findIndex((u) => u.id == id);

        if (userIndex === -1) {
            res.statusCode = 404;
            return res.end("User Not Found");
        }

        userData.splice(userIndex, 1);

        res.statusCode = 200;
        res.end("User deleted successfully");

    }

    // PUT /users
    // Change existing user's ID
    else if (url === "/users" && method === "PUT") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                const data = JSON.parse(body);

                // Find old user
                const user = userData.find((u) => u.id == data.oldId);

                if (!user) {
                    res.statusCode = 404;
                    return res.end("User Not Found");
                }

                // Change ID
                user.id = data.newId;

                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;

                res.end(JSON.stringify({
                    message: "User ID changed successfully",
                    user: user
                }));

            } catch (error) {

                res.statusCode = 400;
                res.end("Invalid JSON data");

            }
        });
    }

    // Invalid route
    else {

        res.statusCode = 404;
        res.end("Page Not Found");

    }

});

server.listen(4000, () => {

    console.log("Server is running on port number 4000");

});