const express = require('express');
const path = require('node:path');
const app = express();

const PORT = process.env.PORT || 3000;

const books = [{ id: 1, title: 'Harry Potter' }];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/books', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'books.html'));
});

app.get('/api/bookslist', (req, res) => {
  res.json({
    books,
  });
});

app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

app.listen(PORT, (req, res) =>
  console.log(`Server is running on localhost:${PORT}`),
);
