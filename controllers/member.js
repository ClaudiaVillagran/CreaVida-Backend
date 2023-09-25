const Event = require("../models/event");
const Member = require("../models/member");

async function createMember(req, res) {
    const { name, lastname, age, email, message } = req.body;
    try {
        // Crea un nuevo usuario
        const newMember = new Member({
            name,
            lastname,
            age,
            email,
            message
        });
        console.log(newMember);
        // Guarda el usuario en la base de datos
        const user = await newUser.save();

        // Supongamos que tienes el ID del evento que deseas asignar
        const eventId = 'ID_DEL_EVENTO';

        // Agrega el ID del evento al campo 'events' del usuario
        await User.findByIdAndUpdate(
            user._id, // ID del usuario recién creado
            { $push: { events: eventId } } // Agrega el ID del evento al arreglo 'events'
        );

        res.status(201).json({ user, message: 'Usuario creado y evento asignado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
}