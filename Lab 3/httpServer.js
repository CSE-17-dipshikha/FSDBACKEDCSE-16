import http from "http";

const userData = [
    {
        id: 101,
        name: "Abc",
        email: "cm@abes.call.in"
    }
];

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === "/msg" && method === "GET") {
        res.end("This is welcome message from server");
    }

    else if (url === "/sys" && method === "GET") {
        res.end("This is system information");
    }

    else if (url === "/data" && method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(userData));
    }

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

    else if (url === "/users" && method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(userData));
    }

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

    else {
        res.statusCode = 404;
        res.end("Page Not Found");
    }
});

server.listen(4000, () => {
    console.log("Server is running on port number 4000");
});