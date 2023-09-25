const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload');

dotenv.config();
console.log("a",dotenv.config)

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("conexion exitosa");
  })
  .catch((error) => {
    console.log(error);
  });

console.log("API exitosa");

const app = express();

app.use(cors());
app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes= require('./routes/user');
const eventRoutes= require('./routes/event');
const donationRoutes= require('./routes/donation');

app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/donation', donationRoutes);

app.listen(process.env.PORT, () => {
  console.log("Servidor de node corriendo en el puerto:", process.env.PORT);
});