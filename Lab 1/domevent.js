import { EventEmitter } from "node:events";

function createDOMElement() {
    const emitter = new EventEmitter();

    return {
        addEventListener(eventName, callback) {
            emitter.on(eventName, callback);
        },

        removeEventListener(eventName, callback) {
            emitter.off(eventName, callback);
        },

        dispatchEvent(event) {
            emitter.emit(event.type, event);
        }
    };
}

const button = createDOMElement();

button.addEventListener("click", () => {
    console.log("Button clicked!");
});

function handleClick(event) {
    console.log("clicked");
    console.log("Event type:", event.type);
    console.log("Detail:", event.detail);
}

button.addEventListener("click", handleClick);

button.dispatchEvent({
    type: "click",
    detail: "Hello from Node.js"
});

button.removeEventListener("click", handleClick);

button.dispatchEvent({
    type: "click",
    detail: "Second click"
});

button.addEventListener("save", handleClick);

button.dispatchEvent({
    type: "save",
    detail: "This will be printed"
});