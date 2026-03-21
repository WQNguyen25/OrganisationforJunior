const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.post('/login', (req, res) => {
    console.log("Server received:", req.body);
    res.json({ status: "Received" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});