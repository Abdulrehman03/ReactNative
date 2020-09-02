const config = require('config');
const mongoose = require('mongoose');
const db = config.get('mongoURI');


const connectDB = async () => {

    try {

        await mongoose.connect(db, {
        });
        console.log("MongoDB connected");

    } catch (err) {
        console.log(err.message)
    }

}
module.exports = connectDB;