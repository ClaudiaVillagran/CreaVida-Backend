const WebpayPlus = require("transbank-sdk").WebpayPlus; // CommonJS
const {
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
} = require("transbank-sdk"); // CommonJS
const uuid = require("uuid");
// Controlador para iniciar una transacción
const startPayment = async (req, res) => {
  console.log(req.body);
  let amount = req.body.amount
  console.log(amount);
  const returnUrl = "https://www.fcreavida.cl/confirmation-payment"; // URL de retorno

  let sessionId = uuid.v4();
  let buyOrder = "buyOrder" + Date.now();

  const commerceCode = 597050513381;
  const apiKey = '515bda59-40b0-483f-acd0-6d305bc183af';
  WebpayPlus.environment = Environment.Production;
WebpayPlus.configureForProduction(commerceCode, apiKey);
  try {
   // console.log(buyOrder);
    //console.log(sessionId);
    //console.log(amount);
    
    const response = await (new WebpayPlus.Transaction()).create(
  buyOrder, 
  sessionId, 
  amount, 
  returnUrl
);

    console.log(response.token);
    res.status(200).json({ url: response.url, token: response.token });
  } catch (error) {
    console.error("Error al iniciar la transacción:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const confirmPayment = async (req, res) => {
  const { token_ws } = req.body;
const commerceCode = 597050513381;
  const apiKey = '515bda59-40b0-483f-acd0-6d305bc183af';
  WebpayPlus.environment = Environment.Production;
WebpayPlus.configureForProduction(commerceCode, apiKey);
  try {
       const response = await (new WebpayPlus.Transaction()).commit(
  	token_ws
	);

    
    // console.log(response);

    if (response.response_code === 0 && response.status === "AUTHORIZED") {
      // Obtener información de la transacción
      const transactionInfo = {
        vci: response.vci,
        amount: response.amount,
        status: response.status,
        buyOrder: response.buyOrder,
        sessionId: response.sessionId,
        cardDetail: response.cardDetail,
        accountingDate: response.accountingDate,
        transactionDate: response.transactionDate,
        authorizationCode: response.authorizationCode,
        paymentTypeCode: response.paymentTypeCode,
        responseCode: response.responseCode,
        installmentsAmount: response.installmentsAmount,
        installmentsNumber: response.installmentsNumber,
        balance: response.balance,
      };

      // Realizar acciones necesarias con la información de la transacción
      // Puedes enviar la información a la vista o almacenarla en la base de datos, según tus necesidades

      res.status(200).json({
        status: "success",
        transactionInfo,
      });
    } else {
      // La transacción no fue aprobada
      res.status(200).json({
        status: "failed",
        responseCode: response.responseCode,
        statusDescription: response.status,
      });
    }
  } catch (error) {
    console.error("Error al confirmar transacción:", error);

    // Manejar errores específicos de Transbank
    if (error instanceof TransbankError) {
      console.error("Detalles específicos de Transbank:", error.details);
    }

    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { startPayment, confirmPayment };
