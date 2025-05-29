const express = require('express');
const path = require('path');

// 1. Initialize Express app FIRST
const app = express();
const PORT = process.env.PORT || 3000;

// 2. THEN add middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// 3. Configure static files
app.use(express.static(__dirname));

// 4. Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicit login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Login POST endpoint
app.post('/login', (req, res) => {
  res.send('Login endpoint working!');
});

// 5. Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});