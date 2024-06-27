const express = require("express");
const sendEmail = express.Router();
const sendEmailController = require("../controllers/sendEmail");

// sendEmail.get("/sendEmail", sendEmailController);

module.exports = sendEmail;
