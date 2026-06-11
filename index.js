const express = require('express');
const path = require('node:path');
const app = express();

const PORT = process.env.PORT || 3000;

const notes = [
  {
    id: 1,
    text: 'Learn English',
  },
];

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json({ notes });
});

app.get('/api/notes/:id', (req, res) => {
  const targetNotes = notes.find((e) => e.id === Number(req.params.id));
  if (!targetNotes) return res.status(404).send('Not found');
  res.send(`value: ${JSON.stringify(targetNotes.text)}`);
});

app.post('/api/notes/new', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text is required' });

  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  const newNote = {
    id: maxId + 1,
    text,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalNotes: notes.length,
  });
});

app.delete('/api/notes/delete/:id', (req, res) => {
  const id = req.params.id;
  const targetId = parseInt(id);
  const index = notes.findIndex((e) => e.id === targetId);
  if (index === -1) return res.status(404).send('Not found');
  notes.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
