require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());
mailgun.config({
  API_KEY: process.env.API_KEY,
  DOMAIN: process.env.DOMAIN,
});

const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

app.post("/form", (req, res) => {
  const { firstname, lastname, email, message } = req.fields; //destructuring
  //   console.log(req.fields);

  const data = {
    from: `${firstname} ${lastname} <${email}>`,
    to: MAIL,
    subject: `Formulaire envoyé par ${firstname}`,
    text: message,
  };

  //   console.log(data);
  mailgun.messages().send(data, (error, body) => {
    console.log(error);
    console.log(body);
  });

  res.status(200).json({ message: "Données reçues, message envoyé" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
