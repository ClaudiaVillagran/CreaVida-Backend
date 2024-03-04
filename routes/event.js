const express = require('express');
const event = require('../controllers/event');
const verifyToken = require('../middlewares/verifyToken');
const api = express.Router();

api.post('/register', event.createEvent);
api.get('/getEvents', event.getEvents);
api.get('/getEvent/:id', event.getEventById);
api.put('/updateEvent/:id', event.updateEvent);
api.delete('/deleteEvent/:id', event.deleteEvent);
api.post('/upload', (req, res) => {
    console.log("req.files")
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No se ha seleccionado ningún archivooooooooo.');
    }
    console.log("req.files")
    const image = req.files.image; // "image" es el nombre del campo en el formulario
    console.log(image);
    const uploadPath = __dirname + '/uploads/' + image.name;
  
    image.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.send('Archivo subido correctamente.');
    });
  });

module.exports = api;