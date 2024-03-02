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
    console.log(email, password);
    try {
        // Buscar al usuario por su email en la base de datos
        const user = await User.findOne({ email });
        const secretKey = process.env.JWT_SECRET;

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // console.log(isPasswordValid)
        // console.log(user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        //TOKEN DE AUTH
        const payload = {
            userId: user._id,
            username: user.username,
        };

        // console.log('hola')
        console.log(payload)
        const token = jwt.sign(payload, secretKey);
        console.log(token);
        res.json({
            status: 'success',
            message: 'Inicio de sesión exitoso',
            token
        });
        console.log('object');

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
    const userToken = req.params.token;
    
    const secretKey = process.env.JWT_SECRET;
    try {   
        console.log(userToken);
        // Verificar y decodificar el token para obtener la información del usuario
        const decodedToken = jwt.verify(userToken, secretKey); // 'secret' debe ser la misma clave secreta utilizada para firmar el token
        console.log(decodedToken);
        // Buscar al usuario en la base de datos utilizando la información del token
        const user = await User.findById(decodedToken.userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si el usuario es encontrado, responder con los datos del usuario
        res.json(user);
    } catch (error) {
        // Manejar errores de verificación o búsqueda de usuario
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    findUser
};
