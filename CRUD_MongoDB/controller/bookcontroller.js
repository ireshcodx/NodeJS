const Joi = require('joi');
const { getDB } = require('../config/database');

// Define validation schema
const bookSchema = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().min(3).required(),
  year: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
});

// Fetch all books
const getBooks = async (req, res) => {
  try {
    const db = getDB();
    const books = await db.collection('books').find().toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const book = req.body;

    const { error } = bookSchema.validate(book);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const db = getDB();
    const result = await db.collection('books').insertOne(book);
    res.status(201).json({ message: 'Book added successfully', bookId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
};

module.exports = { getBooks, addBook };