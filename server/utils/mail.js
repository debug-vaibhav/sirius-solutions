const nodemailer = require("nodemailer");
const config = require("../configs/config");

const getTransporter = () => {
  const email = config.smtp.admin.email;
  const password = config.smtp.admin.password;
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: password
    }
  });
  return transporter;
};

module.exports = { getTransporter };
