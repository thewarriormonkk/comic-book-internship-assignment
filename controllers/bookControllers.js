const Book = require('../models/bookModel');
const asyncHandler = require('express-async-handler');


// @description Get books
// @route GET /api/books
// @access Public
const getBooks = asyncHandler(async (req, res) => {

    // pagination
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * itemsPerPage;

    // filter
    const filter = {};
    if (req.query.author) {
        filter.author = req.query.author;
    }
    if (req.query.year) {
        filter.year = parseInt(req.query.year);
    }
    if (req.query.price) {
        filter.price = { $lte: parseFloat(req.query.price) };
    }

    if (req.query.condition) {
        filter.condition = req.query.condition;
    }

    // sorting
    let sort = {};
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === "desc" ? - 1 : 1;
    }

    const books = await Book.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(itemsPerPage);

    // if no book found
    if (!books) {
        res.status(400);
        throw new Error("no such book");
    }

    const totalComicBooks = await Book.countDocuments(filter);

    res.json({
        books,
        currentPage: page,
        totalPages: Math.ceil(totalComicBooks / itemsPerPage),
        totalItems: totalComicBooks,
    });
});


// @description Get book details
// @route GET /api/books/:id
// @acess Public
const bookDetails = asyncHandler(async (req, res) => {

    // find book details
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("book not found!");
    }
    res.status(200).json(book);
});


// @description Create book
// @route POST /api/books
// @access Public
const createBook = asyncHandler(async (req, res) => {
    const {
        name, author, publicationYear, price, discount, pages, condition, description, genre
    } = req.body;

    // check for duplicate item
    const bookName = await Book.findOne({ name });
    if (bookName) {
        res.status(400);
        throw new Error('book already exists');
    }

    // create book
    const book = await Book.create({
        name,
        author,
        pages,
        publicationYear,
        price,
        discount,
        pages,
        condition,
        description,
        genre
    });

    res.status(201).json(book);
});


// @description Update book
// @route PUT /api/books/:id
// @access Public
const editBook = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // edit book
    const book = await Book.findByIdAndUpdate(id, req.body);

    if (!book) {
        res.status(404);
        throw new Error('book not found!!');
    }
    res.status(200).json({
        id
    });
});


// @description Remove book
// @route DELETE /api/books/:id
// @access Public
const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        res.status(400);
        throw new Error('book not found');
    }

    // delete book
    await book.deleteOne();
    res.status(200).json({
        id,
        message: "removed successfully"
    });
});


module.exports = {
    getBooks,
    bookDetails,
    createBook,
    editBook,
    deleteBook
}