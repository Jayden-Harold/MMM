const express=require('express');
const { request } = require('http');

const index = express();
index.use(express.json);

let books = [];

let bookIDCounter = 1;

let detailIDCounter = 1;



const PORT = process.env.PORT || 3000;

index.listen(PORT, () => {{
    console.log("Server Listening on PORT: ", PORT);
}
});

index.get("/whoami", (request, response) => {
    const whoami = {
        "studentNumber": "2656236"
    };
    response.send(whoami);
});

index.get("/books", (request, response) => {
    response.json(books);
});

index.get("/books/:id", (request, response) => {
    const book = books.find(b => b.id === request.params.id);
    if (!book){
        return response.status(404).json({ error: "Not found"});
    }
    response.json(book);
}
);

index.post("/books", (request, response) => {
    const {id, title, details} = request.body;
    if (!id || !title || !details){
        return response.status(400).json({ error: "Bad Request"});
    }

    const newBook = {id : String(id), title, details};
    books.push(newBook);
    response.status(201).json(newBook);
});

index.put("/books/:id", (request, response) => {
    const book = books.find(b => b.id === request.params.id);
    if (!book){
        return response.status(404).json({ error: "Not found"});
    }
    book.title = request.body.title || book.title;
    response.json(book);
})

index.delete("/books/:id", (request, response) => {
    books = books.filter(b => b.id !== request.params.id);
    response.status(204).send();
});

index.post("/books/:id/details", (request, response) => {
    const {id, title, details} = request.body;
    if (!id || !title || !details){
        return response.status(400).json({ error: "Bad Request"});
    }

    const newBook = {id : String(id), title, details};
    books.push(newBook);
    response.status(201).json(newBook);
});

app.post('/books/:id/details', (request, response) => {
    const book = books.find(b => b.id === request.params.id);
    if (!book) return response.status(404).json({ error: "Book not found" });
    
    const { author, genre, publicationYear } = request.body;
    if (!author || !genre || !publicationYear) return response.status(400).json({ error: "Invalid detail data" });
    
    const newDetail = { id: String(detailIdCounter++), author, genre, publicationYear };
    book.details.push(newDetail);
    response.status(201).json(newDetail);
});

index.delete('/books/:id/details/:detailId', (request, response) => {
    const book = books.find(b => b.id === request.params.id);
    if (!book) return response.status(404).json({ error: "Book not found" });
    
    book.details = book.details.filter(d => d.id !== request.params.detailId);
    response.status(204).send();
});
