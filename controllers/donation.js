const Donation = require("../models/donation");

async function createDonation(req, res) {
  const { name, surname, amount, age, message } = req.body;

  try {
    const newDonation = new Donation({
      name,
      surname,
      age,
      amount,
      message,
    });

    const savedDonation = await newDonation.save();
    res.status(201).json({
      status: "success",
      message: "Datos de la donación",
      savedDonation,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la donación", error });
  }
}

async function getAllDonations(req, res) {
  try {
    const donations = await Donation.find();
    res.status(200).json({
      statusbar: "success",
      donations,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las donaciones", error });
  }
}

async function getDonationById(req, res) {
  const donationId = req.params.id;

  try {
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donación no encontrada" });
    }
    res.status(200).json({
      status: "success",
      donation,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la donación", error });
  }
}
module.exports = {
  createDonation,
  getAllDonations,
  getDonationById
};
