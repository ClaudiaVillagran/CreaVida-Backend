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
  let amount = req.body.amount;
  console.log(amount);
  const returnUrl = "https://www.fcreavida.cl/confirmation-payment"; // URL de retorno

  let sessionId = uuid.v4();
  let buyOrder = "buyOrder" + Date.now();

  WebpayPlus.commerceCode = 597050513381;
  WebpayPlus.apiKey = "515bda59-40b0-483f-acd0-6d305bc183af";
  WebpayPlus.environment = Environment.Production;

  try {
    const tx = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Production
      )
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
  const apiKey = "515bda59-40b0-483f-acd0-6d305bc183af";
  WebpayPlus.environment = Environment.Production;
  WebpayPlus.configureForProduction(commerceCode, apiKey);
  try {
    const tx = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Production
      )
    );
    const response = await new WebpayPlus.Transaction().commit(token_ws);

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

      res.status(200).json({
        status: "success",
        transactionInfo,
      });
    } else {
      res.status(200).json({
        status: "failed",
        responseCode: response.responseCode,
        statusDescription: response.status,
      });
    }
  } catch (error) {
    console.error("Error al confirmar transacción:", error);

    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { startPayment, confirmPayment };
