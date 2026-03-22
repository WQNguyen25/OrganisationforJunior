document.getElementById("myForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const action = event.submitter.id === "signInBtn" ? "/register" : "/login";

    const payload = {
        user: document.getElementById("userName").value,
        pass: document.getElementById("Password").value
    };

    if (payload.pass.trim() === "") {
        const greeting = document.getElementById("greeting");
        greeting.textContent = "Error: Password cannot be empty.";
        greeting.style.color = "red";
        return; // Stop the function here!
    }

    // 2. The Universal Fetch
    // We use the 'action' variable to send the data to the right door
    const response = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    const greeting = document.getElementById("greeting");
    greeting.textContent = result.message;

    if (result.success) {
        greeting.style.color = "green";

        // 1. REDIRECT: Only if they were logging in (not registering)
        if (action === "/login") {
            // Wait 1 second so they can actually read the success message
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);
        }

        // 2. CLEAR FIELDS: Empty the inputs after success
        userName.value = "";
        Password.value = "";

    } else {
        greeting.style.color = "red";
        
        // 3. OPTIONAL: Clear only the password on failure
        Password.value = ""; 
    }

});