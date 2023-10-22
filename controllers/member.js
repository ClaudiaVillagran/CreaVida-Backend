const Event = require("../models/event");
const Member = require("../models/member");

async function createMember(req, res) {
  const { name, lastname, age, email, number, message, event } = req.body;
  try {
    // Crea un nuevo usuario
    const newMember = new Member({
      name,
      lastname,
      age,
      email,
      number,
      message,
      events: [event],
    });
    console.log(newMember);

    let filter = { name, lastname, number };

    if (email) {
      filter = { ...filter, email };
    }

    const existMember = await Member.find(filter);
    if (existMember.length > 0) {
      console.log("si existe",existMember);
      return res.status(400).json({
        code: 1,
        message:
          "Usted ya es participe del evento, pronto nos contactaremos con usted",
      });
    }
    
    // Guarda el usuario en la base de datos

    const member = await newMember.save();
    // Supongamos que tienes el ID del evento que deseas asignar

    // // Agrega el ID del evento al campo 'events' del usuario

    await Event.findByIdAndUpdate(event, { $push: { members: member._id } });

    const populatedMember = await Member.findById(member._id).populate(
      "events"
    );

    res.status(200).json({
      status: "success",
      message: "Datos del miembro",
      member: populatedMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
}

async function getMember(req, res) {
  try {
    const memberId = req.params.memberId; // Asume que tienes el ID del miembro
    const member = await Member.findById(memberId).populate("events");

    if (!member) {
      return res.status(404).json({ message: "Miembro no encontrado" });
    }

    res.status(200).json({
      status: "success",
      message: "Datos del miembro",
      member,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el miembro" });
  }
}

module.exports = {
  createMember,
  getMember,
};
