const { Schema, model } = require("mongoose");

const memberSchema = new Schema({
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
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },
    ]
});

module.exports = model("Member", memberSchema);