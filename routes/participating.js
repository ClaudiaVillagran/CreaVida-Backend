const express = require('express');
const participating = require('../controllers/participating');
const api = express.Router();

api.post('/register', participating.createparticipating);
module.exports = api;