const express = require('express');
const app = express();
const path = require('node:path');

const PORT = process.env.PORT || 3000;

let visits = 0;

app.get('/', (req, res) => {
  visits++;
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  visits++;
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  visits++;
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/api/visits', (req, res) => {
  res.json({
    visits,
  });
});

app.listen(PORT, console.log(`Server is running on localhost:${PORT}`));
