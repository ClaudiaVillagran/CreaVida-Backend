const Event = require("../models/event");
const Participating = require("../models/participating");

async function createparticipating(req, res) {
  const { name, lastname, age, email, number, message } = req.body;
  try {
    // Crea un nuevo usuario
    const newParticipating = new Participating({
      name,
      lastname,
      age,
      email,
      number,
      message
    });
    console.log(newSocio);

    let filter = { name, lastname, number };

    if (email) {
      filter = { ...filter, email };
    }

    const existParticipating = await Participating.find(filter);
    if (existParticipating.length > 0) {
      console.log("si existe",existParticipating);
      return res.status(400).json({
        code: 1,
        message:
          "Usted ya es participe del evento, pronto nos contactaremos con usted",
      });
    }
    
    // Guarda el usuario en la base de datos

    const participating = await newParticipating.save();
    // Supongamos que tienes el ID del evento que deseas asignar

    // // Agrega el ID del evento al campo 'events' del usuario


    res.status(200).json({
      status: "success",
      message: "Datos del miembro",
      participating
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
}

async function getParticipating(req, res) {
  try {
    const participatingId = req.params.participatingId; // Asume que tienes el ID del miembro
    const participating = await Participating.findById(participatingId);

    if (!participating) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    res.status(200).json({
      status: "success",
      message: "Datos del socio",
      participating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el socio" });
  }
}

module.exports = {
    createparticipating,
    getParticipating,
};
