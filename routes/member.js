const express = require('express');
const member = require('../controllers/member');
const api = express.Router();

api.post('/register', member.createMember);
module.exports = api;