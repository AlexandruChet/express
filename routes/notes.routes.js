const express = require('express');
const router = express.Router();

let notes = [{ id: 1, text: 'Learn English' }];

router.get('/', (req, res) => {
  res.json({ notes });
});

router.get('/stats/all', (req, res) => {
  res.json({ totalNotes: notes.length });
});

router.get('/:id', (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
});

router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text is required' });

  const newNote = {
    id: notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1,
    text,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

router.put('/:id', (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) return res.status(404).json({ message: 'Note not found' });

  if (!req.body.text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  note.text = req.body.text;
  res.json(note);
});

router.delete('/:id', (req, res) => {
  const index = notes.findIndex((n) => n.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Note not found' });

  notes.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
