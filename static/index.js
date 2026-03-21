document.getElementById("myForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const action = event.submitter.id === "signInBtn" ? "/register" : "/login";

    const payload = {
        user: document.getElementById("userName").value,
        pass: document.getElementById("Password").value
    };

    // 2. The Universal Fetch
    // We use the 'action' variable to send the data to the right door
    const response = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    document.getElementById("greeting").textContent = result.message;

    // Debugging: This will show you exactly what the server sent
    console.log("Server response:", result);

    if (result.success) {
        // Use result.message because that's what we named it in server.js
        document.getElementById("greeting").textContent = result.message;
    }
});