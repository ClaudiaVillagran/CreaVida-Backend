const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload');

dotenv.config();
console.log("a",dotenv.config)

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
  })
  .then(() => {
    console.log("conexion exitosa");
  })
  .catch((error) => {
    console.log(error);
  });

console.log("API exitosa");

const app = express();

app.use(cors({
	origin: '*',
}));
app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes= require('./routes/user');
const eventRoutes= require('./routes/event');
const donationRoutes= require('./routes/donation');
const memberRoutes= require('./routes/member');
const socioRoutes= require('./routes/socio');
const paymentRoutes = require('./routes/paymentTransbank');
// const returnRoutes = require('./routes/returnTransbank');

app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/socio', socioRoutes);
// Rutas de pago
app.use('/api/payment', paymentRoutes);
// Rutas de retorno
// app.use('/api/return', returnRoutes);


app.listen(process.env.PORT, () => {
  console.log("Servidor de node corriendo en el puerto:", process.env.PORT);
});
