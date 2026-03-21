document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Stops the page from refreshing

    // 1. Get values from the input boxes
    const userName = document.getElementById("userName").value;
    const userPass = document.getElementById("Password").value;
    
    // 2. Save them to localStorage (optional, if you need them later)
    localStorage.setItem("userDisplayName", userName);
    localStorage.setItem("userPassword", userPass);

    // 3. Update the HTML elements right now
    document.getElementById("greeting").textContent = `Hello, ${userName}`;
    document.getElementById("passDisplay").textContent = `Your password is: ${userPass}`;
    
    // 4. Clear the input boxes (optional, for a clean look)
    document.getElementById("userName").value = "";
    document.getElementById("Password").value = "";
});