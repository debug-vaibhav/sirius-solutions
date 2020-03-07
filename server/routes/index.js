let express = require("express");
let router = express.Router();
const { getTransporter } = require("../utils/mail");
const config = require("../configs/config.json");

router.get("/", (req, res, next) => {
  res.json({
    message: "Everything working fine",
    data: null
  });
});

router.post("/send", (req, res, next) => {
  let mailOptions = {
    from: config.smtp.admin.email,
    to: config.smtp.admin.email,
    subject: "Enquiry mail received from siriussolutions.in",
    html: `
		  <h4>From ${req.body.name},<br><br>
          ${req.body.message}
          <br>
          <br>
          Thanks,<br>
          ${req.body.name}<br>
          Email - ${req.body.email}<br>
          Contact - +91 ${req.body.phone}
        `
  };
  getTransporter()
    .sendMail(mailOptions)
    .then(resp => {
      res.status(201).json({
        message: "Email sent successfully",
        data: resp
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        message: "Error occured while sending email",
        data: error
      });
    });
});

module.exports = router;
