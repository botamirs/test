const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    createdAt: {type: Date, default: Date.now()},
    updateAt: {type: Date, default: Date.now()}
});

module.exports =  mongoose.model("user", userSchema);
