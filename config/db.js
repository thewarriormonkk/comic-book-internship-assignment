const mongoose = require('mongoose');

const DBConnection = async () => {
    try {
        const connectDb = await mongoose.connect(process.env.DB_URI);
        console.log(`mongodb connected: ${connectDb.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = DBConnection;