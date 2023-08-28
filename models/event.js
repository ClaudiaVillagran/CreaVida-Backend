const { Schema, model } = require("mongoose");
const eventSchema = Schema ({
    title: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      image: {
        data: Buffer, // Almacenará los datos binarios de la imagen
        contentType: String, // El tipo MIME de la imagen (por ejemplo, 'image/jpeg')
      },
      location: String,
      description: String
});

module.exports = model("Event", eventSchema);
