import express from "express";
import dotenv from "dotenv";
import mailer from "express-mailer";
import connectdb from "./config/connectdb.js";
import StudentRoutes from "./Routes/StudentRoutes.js";
import CheckAlready from "./Routes/StudentLogin.js";
dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;
const user=process.env.USER;
const pass=process.env.PASS;

app.set("view engine", "ejs");
connectdb(DB_URL);
mailer.extend(app, {
  from: "rishabhp@edulab.in",
  host: "smtp.gmail.com", // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
app.use(express.json());
app.get("/login", (request, response) => {
  const data = {
    to: "shani@edulab.in",
    subject: "this express mailer example",
    text: "this is test mail",
  };
  app.mailer.send("email", data, (error) => {
    if (error) {
      console.log(error);
      response.send("There was an error sending the email");
      return;
    }

    response.send("Email sent successfully");
  });
  // response.json({status:"success",message:"this is homepage"});
});

app.post("/Student/Login", (req, resp) => {
  console.log(req.body.StuEmail);
  
  const OTP=Math.floor(100000 + Math.random() * 900000)
  const data = {
    to: "rishabhprajapti150@gmail.com",
    subject: `login OTP ${OTP}`,
    text: "Login with Email Example",
  };
  if (CheckAlready(req.body.StuEmail)) {
    app.mailer.send("email", data, (error) => {
      if (error) {
        console.log(error);
        resp.send("There was an error sending the email");
        return;
      }
     
      resp.send("Email sent successfully");
    });
  } else {
    resp.send("Invali login");
  }
});

app.use("/api", StudentRoutes);
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
