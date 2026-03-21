const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. Setup: This tells Express where your files are and how to read JSON
app.use(express.static('static'));
app.use(express.json());

// 2. File Route: This sends the HTML to the browser when they visit the site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// 3. Logic Route: This is the "Brain." It doesn't send a file; it sends DATA.
const fs = require('fs'); // Add this at the top

app.post('/login', (req, res) => {
    const { user, pass } = req.body;
    const filePath = path.join(__dirname, 'users.json');

    // 1. Read the existing file
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    // 2. Add the new user to the list
    users.push({ username: user, password: pass });

    // 3. Save the updated list back to the file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.json({ 
        success: true, 
        message: `User ${user} has been saved to the JSON file!` 
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});