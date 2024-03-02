const express = require('express');
const user = require('../controllers/user');
const verifyToken = require('../middlewares/verifyToken');
const api = express.Router();

api.post('/register', user.register);
api.post('/login', user.login);
api.get('/findUser/:token', user.findUser);
api.delete('/deleteUser/:id',verifyToken, user.deleteUser);
api.put('/updateUser/:id',verifyToken, user.updateUser);

module.exports = api;
