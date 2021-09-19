const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "عمومی",
        enum: ["عمومی", "خصوصی"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("post", postSchema);