const Event = require("../models/event");
const Socio = require("../models/socio");

async function createSocio(req, res) {
  const { name, lastname, age, email, number, message } = req.body;
  try {
    // Crea un nuevo usuario
    const newSocio = new Socio({
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

    const existSocio = await Socio.find(filter);
    if (existSocio.length > 0) {
      console.log("si existe",existSocio);
      return res.status(400).json({
        code: 1,
        message:
          "Usted ya es participe del evento, pronto nos contactaremos con usted",
      });
    }
    
    // Guarda el usuario en la base de datos

    const socio = await newSocio.save();
    
    res.status(200).json({
      status: "success",
      message: "Datos del miembro",
      socio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
}

async function getSocio(req, res) {
  try {
    const socioId = req.params.socioId; // Asume que tienes el ID del miembro
    const socio = await Socio.findById(socioId);

    if (!socio) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    res.status(200).json({
      status: "success",
      message: "Datos del socio",
      socio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el socio" });
  }
}

module.exports = {
    createSocio,
    getSocio,
};
