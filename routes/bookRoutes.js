const express = require('express');
const router = express.Router();
const {
    getBooks,
    bookDetails,
    createBook,
    editBook,
    deleteBook,
} = require('../controllers/bookControllers');

router.get('/', getBooks);
router.get('/:id', bookDetails)
router.post('/', createBook);
router.put('/:id', editBook);
router.delete('/:id', deleteBook);


module.exports = router;