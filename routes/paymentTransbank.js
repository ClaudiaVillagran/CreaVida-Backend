const express = require('express');
const api = express.Router();
const paymentTransbankController = require('../controllers/paymentTransbank');

// Ruta para iniciar una transacción
api.post('/start-payment', paymentTransbankController.startPayment);
api.post('/confirm-payment', paymentTransbankController.confirmPayment);

module.exports = api;