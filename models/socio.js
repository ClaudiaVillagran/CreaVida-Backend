const { Schema, model } = require("mongoose");

const socioSchema = new Schema({
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

module.exports = model("Socio", socioSchema);