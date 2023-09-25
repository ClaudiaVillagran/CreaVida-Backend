const express = require('express');
const donation = require('../controllers/donation');
const api = express.Router();

api.post('/register', donation.createDonation);
api.get('/getDonations', donation.getAllDonations);
api.get('/getDonation/:id', donation.getDonationById);

module.exports = api;