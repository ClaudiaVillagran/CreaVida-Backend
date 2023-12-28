const Event = require("../models/event");

async function createEvent(req, res) {
  const { title, date,picture, location, description } = req.body;

  try {
    console.log(title, date)
    const newEvent = new Event({
      title,
      date,
      picture,
      location,
      description
    });
    console.log(newEvent);
    const savedEvent = await newEvent.save();
    res.status(201).json({
      status: "success",
      message: "Evento registrado de forma exitosa",
      event: savedEvent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el evento", error });
  }
}
async function getEvents(req, res) {
  try {
    const events = await Event.find();
    res.status(200).json({
      status: "success",
      message: "Lista de eventos",
      events,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos", error });
  }
}

async function getEventById(req, res) {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId).populate('members');
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json({
      status: "success",
      message: "Datos del evento",
      event
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el evento", error });
  }
}
async function updateEvent(req, res) {
  const eventId = req.params.id;
  const updateData = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json({
      status: "success",
      message: "Actualización realizada",
      evento: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el evento", error });
  }
}

async function deleteEvent(req, res) {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json({
      status: "success",
      message: "Evento eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el evento", error });
  }
}
module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
