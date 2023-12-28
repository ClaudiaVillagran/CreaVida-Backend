const { Schema, model } = require("mongoose");
const eventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  picture: {
    type: String,
  },
  location: String,
  description: String,
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
  ],
});

module.exports = model("Event", eventSchema);
