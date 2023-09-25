const { Schema, model } = require("mongoose");
const donationSchema = Schema({
  name: {
    type: String,
    required: true
  },
  surname:{
    type: String,
  },
  
  age:{
    type: Number
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  message: String,
});

module.exports = model("Donation", donationSchema);
