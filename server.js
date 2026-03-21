const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');

// 1. Setup: This tells Express where your files are and how to read JSON
app.use(express.static('static'));
app.use(express.json());

// 2. File Route: This sends the HTML to the browser when they visit the site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// 3. Logic Route: This is the "Brain." It doesn't send a file; it sends DATA.
const filePath = path.join(__dirname, 'users.json');

// Helper function to get users from the file
function getUsers() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// ROUTE 1: REGISTER (Sign Up)
app.post('/register', (req, res) => {
    const { user, pass } = req.body;
    const users = getUsers();

    // Check if user already exists
    const exists = users.find(u => u.username === user);
    if (exists) {
        return res.json({ success: false, message: "Username already taken!" });
    }

    
    // Save new user
    users.push({ username: user, password: pass });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.json({ success: true, message: "Account created successfully!" });
});

// ROUTE 2: LOGIN (Sign In)
app.post('/login', (req, res) => {
    const { user, pass } = req.body;
    const users = getUsers();

    // Find the user in our list
    const foundUser = users.find(u => u.username === user);

    if (foundUser && foundUser.password === pass) {
        // Match found!
        res.json({ success: true, message: `Welcome back, ${user}!` });
    } else {
        // No match or wrong password
        res.json({ success: false, message: "Invalid username or password." });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});