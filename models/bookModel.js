const mongoose = require('mongoose');

// schema
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: Number,
    pages: Number,
    condition: {
        type: String,
        enum: ['New', "Used"],
        required: true,
    },
    description: String,
    genre: String
}, { timestamps: true });

// exporting model
module.exports = mongoose.model('Book', bookSchema);