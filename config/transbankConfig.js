// const Transbank = require('transbank-sdk');

// // Configuración para ambiente de integración
// Transbank.Configuration.configureForIntegration();

// // Credenciales de prueba proporcionadas por Transbank
// const commerceCode =597055555532;
// const privateKey ='579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

// // Configurar las credenciales
// const credentials = Transbank.WebpayPlus.Configuration.forTestingWebpayPlusNormal();
// credentials.commerceCode = commerceCode;
// credentials.privateKey = privateKey;

// // Exportar las credenciales configuradas
// module.exports = credentials;


// // Versión 3.x del SDK

// // Versión 2.x del SDK
// const response = await WebpayPlus.Transaction.create(buyOrder, sessionId, amount, returnUrl);