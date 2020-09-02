const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
})
module.exports = Admin = mongoose.model('admins',AdminSchema)