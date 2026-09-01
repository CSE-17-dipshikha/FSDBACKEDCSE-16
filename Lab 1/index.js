import { EventEmitter } from "node:events";

const task = new EventEmitter();

task.on("start", (course) => {
    console.log(`Course started: ${course}`);
});

task.on("end", (reason) => {
    console.log(`Session ending. Reason: ${reason}`);
});

task.emit("start", "Node.js");
task.emit("end", "session completed");

task.on("start",(course) =>{
    console.log(`${course} started`);
});
task.emit("greet","students");
task.emit("start","fsd");
task.emit("exit","dsa");