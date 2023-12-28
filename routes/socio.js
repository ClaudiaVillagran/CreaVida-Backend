const express = require('express');
const socio = require('../controllers/socio');
const api = express.Router();

api.post('/register', socio.createSocio);
module.exports = api;