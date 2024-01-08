// const Transbank = require("transbank-sdk");
// const transbankConfig = require("../config/transbankConfig");

// const webpayPlus = new Transbank.WebpayPlus(transbankConfig);

// // Controlador para manejar la URL de retorno
// const handleReturnUrl = async (req, res) => {
//   // Obtener el token desde la respuesta de la transacción (puede variar según la implementación real)
//   const token = req.query.token; // Suponiendo que el token está en la URL como un parámetro llamado "token"

//   try {
//     // Procesar la transacción después de que el usuario complete el pago
//     const result = await webpayPlus.transaction().commit(token);

//     // Verificar el resultado
//     if (result.vci === "TSY") {
//       // La transacción fue autorizada
//       console.log("Transacción autorizada:", result);
//       res.send("Pago exitoso");
//     } else if (result.vci === "TSN") {
//       // Autenticación Rechazada
//       console.log("Autenticación Rechazada");
//     } else {
//       // Otro resultado
//       console.log("Resultado de autenticación:", result.vci);
//     }
//   } catch (error) {
//     console.error("Error al procesar la transacción:", error);
//     res.status(500).send("Error interno del servidor");
//   }
// };

// module.exports = { handleReturnUrl };
