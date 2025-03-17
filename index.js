// POST /books/:id/details
app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    
    const { author, genre, publicationYear } = req.body;
    if (!author || !genre || !publicationYear) return res.status(400).json({ error: "Invalid detail data" });
    
    const newDetail = { id: String(detailIdCounter++), author, genre, publicationYear };
    book.details.push(newDetail);
    res.status(201).json(newDetail);
});

// DELETE /books/:id/details/:detailId
app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    
    book.details = book.details.filter(d => d.id !== req.params.detailId);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
