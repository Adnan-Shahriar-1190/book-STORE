const router = require("express").Router();
const { query, validationResult } = require('express-validator');
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");
const book = require("../models/book");

// Add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ message: "You are not an admin" });
    }

    // Check if a book with the same title and author already exists
    const { title, author } = req.body;
    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({
        message: "Book with the same title and author already exists",
      });
    }

    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    await book.save();
    res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update book --admin
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(200).json({ message: "Book Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//Delete book --admin
router.delete("/delete-book", async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// Get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// Get recently added books
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(2);
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// Get book by ID
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});


router.get("/search-books", [
  query('name').optional().isString().trim().escape(),
  query('author').optional().isString().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, author } = req.query;
  const searchCriteria = {};

  if (name) {
    searchCriteria.title = new RegExp(name, 'i'); // case-insensitive search
  }
  if (author) {
    searchCriteria.author = new RegExp(author, 'i'); // case-insensitive search
  }

  try {
    const books = await Book.find(searchCriteria);
    res.status(200).json({
      status: 'Success',
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get("/books-in-price-range", async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    // Validate input (optional)
    if (!minPrice || !maxPrice) {
      return res.status(400).json({ message: "Please provide both minPrice and maxPrice" });
    }

    // Query database for books within the price range
    const books = await Book.find({
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) }
    });

    res.json({
      status: "Success",
      data: books
    });
  } catch (error) {
    console.error("Error fetching books by price range:", error);
    res.status(500).json({ message: "An error occurred while fetching books" });
  }
});



module.exports = router;
