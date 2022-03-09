const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        // connect to database with a key from .env file
        const connect = await mongoose.connect(process.env.DB_KEY);
        console.log(`Connceted to MongoDB ${connect.connection.host}`);
    } catch (err) {
        // give error if couldnt connect
        console.log(`Could not connect to MongoDB `, err);
        process.exit(1);
    }
}

module.exports = connectDB;