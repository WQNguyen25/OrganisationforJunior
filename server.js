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
app.post('/register', async (req, res) => {
    const { user, pass } = req.body;
    const users = getUsers();

    if (!pass || pass.trim() === "") {
        return res.json({ 
            success: false, 
            message: "Registration failed: Password is required." 
        });
    }
    // Check if user already exists
    const exists = users.find(u => u.username === user);
    if (exists) {
        return res.json({ success: false, message: "Username already taken!" });
    }


    // Save new user
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Save the plain username but the SCRAMBLED password
    users.push({ username: user, password: hashedPassword });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.json({ success: true, message: "Account created successfully!" });
});

// ROUTE 2: LOGIN (Sign In)
app.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    const users = getUsers();
    const foundUser = users.find(u => u.username === user);

    if (foundUser) {
        // 'await' is needed here too for bcrypt.compare
        const match = await bcrypt.compare(pass, foundUser.password);
        if (match) {
            return res.json({ success: true, message: "Welcome back!" });
        }
    }
    // No match or wrong password
    res.json({ success: false, message: "Invalid username or password." });

});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});