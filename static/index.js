document.getElementById("myForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const payload = {
        user: document.getElementById("userName").value,
        pass: document.getElementById("Password").value
    };

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    // Debugging: This will show you exactly what the server sent
    console.log("Server response:", result);

    if (result.success) {
        // Use result.message because that's what we named it in server.js
        document.getElementById("greeting").textContent = result.message;
    }
});