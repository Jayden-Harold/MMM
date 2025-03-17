const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let books = [];
let bookDetailsIdCounter = 1;
let bookIdCounter = 1;

function generateId() {
    return (bookIdCounter++).toString();
  }
  
  function generateDetailId() {
    return (bookDetailsIdCounter++).toString();
  }

app.get("/whoami", (req, res) =>{
    res.json({ studentnumber: "2656236"})

});

app.get("/books", (req, res) =>{
    res.json(books)

});


app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  });
  
  // POST a new book
  app.post('/books', (req, res) => {
    const { title, details } = req.body;
    
    if (!title || !details || !Array.isArray(details)) {
      return res.status(400).json({ error: 'Missing required book details' });
    }
  
    const book = {
      id: generateId(),
      title,
      details: details.map(detail => ({
        ...detail,
        id: generateDetailId()
      }))
    };
  
    books.push(book);
    res.status(201).json(book);
  });
  
  // PUT (update) an existing book
  app.put('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
  
    const { title, details } = req.body;
    if (!title || !details || !Array.isArray(details)) {
      return res.status(400).json({ error: 'Invalid book details' });
    }
  
    books[bookIndex] = {
      id: req.params.id,
      title,
      details: details.map(detail => ({
        ...detail,
        id: generateDetailId()
      }))
    };
  
    res.json(books[bookIndex]);
  });
  
  // DELETE a book
  app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
  
    books.splice(bookIndex, 1);
    res.status(204).send();
  });
  
  // POST to add a detail to a book
  app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
  
    const { author, genre, publicationYear } = req.body;
    if (!author || !genre || !publicationYear) {
      return res.status(400).json({ error: 'Missing required detail fields' });
    }
  
    const detail = {
      id: generateDetailId(),
      author,
      genre,
      publicationYear
    };
  
    book.details.push(detail);
    res.status(201).json(detail);
  });
  
  // DELETE a specific detail from a book
  app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
  
    const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);
    if (detailIndex === -1) {
      return res.status(404).json({ error: 'Detail not found' });
    }
  
    book.details.splice(detailIndex, 1);
    res.status(204).send();
  });
  

  


app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);

})

app.get("/status", (request, response) => {
    const status = {
        "Status" : "Running"
    };

    response.send(status)
});
