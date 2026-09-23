const method = document.getElementById("method");

const url = document.getElementById("url");

const bodySection = document.getElementById("bodySection");

const requestBody = document.getElementById("requestBody");

const response = document.getElementById("response");



// ==========================
// METHOD CHANGE
// ==========================

method.addEventListener("change", () => {

    if (
        method.value === "GET" ||
        method.value === "DELETE"
    ) {

        bodySection.style.display = "none";

    } else {

        bodySection.style.display = "block";

    }

});



// ==========================
// SEND REQUEST
// ==========================

async function sendRequest() {

    const selectedMethod = method.value;

    const apiUrl = url.value.trim();


    response.textContent = "Sending request...";


    try {


        const options = {

            method: selectedMethod,

            headers: {

                "Content-Type": "application/json"

            }

        };


        // POST and PUT body

        if (
            selectedMethod === "POST" ||
            selectedMethod === "PUT"
        ) {

            options.body = requestBody.value;

        }


        const result = await fetch(apiUrl, options);


        const data = await result.json();


        response.textContent =
            JSON.stringify(data, null, 4);


    }

    catch (error) {

        response.textContent =
            "Error: " + error.message;

    }

}