const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true,
        unique: true
    },
    investment: {
        type: Number,
        required: true,

    },
    interest: {
        type: String
    },
    model: [
        {
            
        }
    ],
 
    date: {
        type: Date
    }
})
module.exports = Client = mongoose.model('client', ClientSchema)