// This runs in the browser
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the page from refreshing immediately

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("Password").value;
    // Save to localStorage so other pages (or this one) can see it
    localStorage.setItem("userDisplayName", userName);
    localStorage.setItem("userPassword", password);
    // Optional: Tell the server someone logged in
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: userName }),
    });

    // Refresh the page to show the "Hello" message
    location.reload(); 
});