const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const router = express.Router();


public_users.post('/register', function(req, res) {
    // Retrieve the username and password from the request body
    const { username, password } = req.body;
  
    // Check if the username or password is missing
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
  
    // Check if the username already exists
    if (users.hasOwnProperty(username)) {
      return res.status(409).json({ error: 'Username already exists.' });
    }
  
    // Create a new user with the provided username and password
    users.push(username,password);
  
    return res.status(200).json({ message: 'User registered successfully.' });
  });
  

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    const bookList = books.map(book => book.author);
    res.send(JSON.stringify(bookList, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
  
    // Buscar el libro por el ISBN
    const book = books.find((book) => book.isbn === isbn);
  
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  });
  
  
// Get book details based on author
router.get('/author/:author', function (req, res) {
    const author = req.params.author;
  
    const booksByAuthor = books.filter((book) => book.author === author);
  
    if (booksByAuthor.length > 0) {
      res.json(booksByAuthor);
    } else {
      res.status(404).json({ message: 'No books found for the given author' });
    }
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const author = req.params.title;
  
    const booksByAuthor = books.filter((book) => book.title === title);
  
    if (booksByAuthor.length > 0) {
      res.json(booksByAuthor);
    } else {
      res.status(404).json({ message: 'No books found for the given title' });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    const book = books.find((book) => book.isbn === isbn);
  
    if (book) {
      const reviews = book.reviews;
      res.json(reviews);
    } else {
      res.status(404).json({ message: 'No book found for the given ISBN' });
    }
});

module.exports.general = public_users;
