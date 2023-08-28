const express = require('express');
const event = require('../controllers/event');
const verifyToken = require('../middlewares/verifyToken');
const api = express.Router();

api.post('/register',verifyToken, event.createEvent);
api.get('/getEvents', event.getEvents);
api.get('/getEvent/:id', event.getEventById);
api.put('/updateEvent/:id',verifyToken, event.updateEvent);
api.delete('/deleteEvent/:id',verifyToken, event.deleteEvent);

module.exports = api;