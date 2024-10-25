const express = require('express');
const dotenv = require('dotenv').config();
const bookRouter = require('./routes/bookRoutes');
const DBConnection = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

// db connection
DBConnection();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/books', bookRouter);


// redirect
app.get('/', (req, res) => {
    res.redirect('/api/books');
});

// error handler for unhandled routes
app.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// error handler middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});