const { Schema, model } = require("mongoose");

const participatingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true
    },
    message: {
        type: String
    },
});

module.exports = model("participating", participatingSchema);