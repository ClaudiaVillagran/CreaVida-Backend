const { Schema, model } = require("mongoose");

const userSchema = Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["fotografia", "admin","finanzas"],
        default: "user"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("User", userSchema);