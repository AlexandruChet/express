const express = require('express');
const path = require('node:path');
const app = express();

const PORT = process.env.PORT || 3000;

const books = [
  { id: 1, title: 'Harry Potter' },
  { id: 2, title: 'The Hobbit' },
  { id: 3, title: '1984' },
];

let visits = 0;

app.get('/', (req, res) => {
  visits++;
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  visits++;
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/books', (req, res) => {
  visits++;
  res.sendFile(path.join(__dirname, 'public', 'books.html'));
});

app.get('/contact', (req, res) => {
  visits++;
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/api/books', (req, res) => {
  visits++;
  res.json({
    books,
  });
});

app.get('/books/:id', (req, res) => {
  visits++;
  const bookId = Number(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (!book) return res.status(404).send('<h1>not found</h1>');

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${book.title}</title>
  </head>
  <body>
    <h1>Information about book</h1>
    <p><strong>ID:</strong> ${book.id}</p>
    <p><strong>Name:</strong> ${book.title}</p>
    <a href="/books">back to the list</a>
  </body>
  </html>
`);
});

app.get('/api/visits', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Visits</title>
    </head>
    <body>
        <h1>Number of visits: ${visits}</h1>
    </body>
    </html>
`;

  res.send(htmlContent);
});

app.get('/hello/:name', (req, res) => {
  const userName = req.params.name;
  res.send(`<h1>Hello, ${userName}</h1>`);
});

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
