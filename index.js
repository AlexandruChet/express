const express = require('express');
const path = require('node:path');
const app = express();
const notesRouter = require('./routes/notes.routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'index.html'),
  );
});

app.get('/notes', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'notes.html'),
  );
});

app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});