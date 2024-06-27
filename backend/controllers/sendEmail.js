const nodemailer = require("nodemailer");

const sendEmailController = async (email, name) => {
  //   res.send("i m sending email...");
  //   let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info.team.website@gmail.com",
      pass: "rupi cvcd ikfn wtki",
    },
  });

  let info = await transporter.sendMail({
    from: '"Sagar Tech" <shariques966@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Welcome Message", // Subject line
    text: `hello ${name} Welcome to dashboard`, // plain text body
    html: "<b>Welcome to dashboard</b>", // html body
  });

  console.log("Email", info.messageId);
  //   rres.json(info)
  return info;
};

module.exports = sendEmailController;
