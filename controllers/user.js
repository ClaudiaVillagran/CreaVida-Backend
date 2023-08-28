const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { username, email, password, role } = req.body;
    
    try {
        // Verificar si el correo electrónico ya está en uso
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        console.log('existingUser', existingUser)
        console.log(username, email,password,role)
        // Encriptar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hashedPassword')
        console.log('hashedpw',hashedPassword)

        // Crear el nuevo usuario en la base de datos
        const newUser = new User({ username, email, password: hashedPassword, role });
        console.log('newUser',newUser)
        await newUser.save();

        res.status(201).json({
            status: 'success',
            message: 'Registro exitoso',
            newUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por su email en la base de datos
        const user = await User.findOne({ email });
        const secretKey = process.env.JWT_SECRET;

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log(isPasswordValid)
        console.log(user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        //TOKEN DE AUTH
        console.log('hola')
        const payload = {
            userId: user._id,
            username: user.username,
            role: user.role
        };

        console.log('hola')
        console.log(payload)
        const token = jwt.sign(payload, secretKey, { expiresIn: '5h' });

        res.json({
            status: 'success',
            message: 'Inicio de sesión exitoso',
            token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

async function updateUser(req, res) {
    const { username, email, password} = req.body;
    const userId = req.params.id;

    try {
        // Verificar si el usuario existe en la base de datos
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.log(user)
        // Actualizar los campos del usuario
        user.username = username || user.username;
        user.email = email || user.email;

        // Si se proporciona una nueva contraseña, encriptarla y actualizarla
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Guardar los cambios en la base de datos
        await user.save();

        res.json({ message: 'Perfil actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.id;
    try {
        // Verificar si el usuario existe en la base de datos
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar el usuario de la base de datos
        await user.remove();

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

async function findUser(req, res) {
    const userId = req.params.id;

    try {
        // Buscar al usuario en la base de datos por su ID
        const user = await User.findById(userId);
        console.log('user',user);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    findUser
};
