const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

// Middleware asincrónico para verificar el token en rutas protegidas
async function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    console.log('TOKEN',token);
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        console.log('sad',secretKey, token);
        const decoded = await jwt.verify(token, secretKey);
        console.log('sad');
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido' });
    }
}

module.exports = verifyToken;