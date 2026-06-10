const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const notes = [
  {
    id: 1,
    text: 'Learn English',
  },
];

app.use(express.json());

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const noteId = Number(req.params.id);

  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    return res.status(404).json({
      message: 'Note not found',
    });
  }

  res.json(note);
});

app.post('/api/notes', (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: 'Text is required' });

  const newNote = {
    id: notes.length + 1,
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

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
