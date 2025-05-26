const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// ✅ Serve static files from the current directory
app.use(express.static(__dirname));

// ✅ Serve index.html on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Login route
app.post('/login', (req, res) => {
  res.send('Login endpoint working!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('https://bashastudio-24d01979b2c4.herokuapp.com/')
});
