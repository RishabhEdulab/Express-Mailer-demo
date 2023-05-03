import express from "express";
import StudentModel from "../model/UserModel.js";
import bcrypt from "bcrypt";
import mailer from "express-mailer";
const router = express.Router();
router.post("/Student/Register", async (req, resp) => {
  try {
    const { StuName, StuEmail, StuPassword, StuRollNu, StuMobileNo, StuAge } =
      req.body;
    const AlreadyRegistered = await StudentModel.findOne({
      StuEmail: StuEmail,
    });
    if (AlreadyRegistered === null) {
      if (
        StuName !== null &&
        StuPassword !== null &&
        StuEmail !== null &&
        StuRollNu !== null &&
        StuMobileNo !== null &&
        StuAge !== null
      ) {
        const salt = await bcrypt.genSalt(10);
        const HashPassword = await bcrypt.hash(StuPassword, salt);
        console.log(HashPassword);
        var DocCollection = new StudentModel({
          StuName: StuName,
          StuEmail: StuEmail,
          StuPassword: HashPassword,
          StuRollNu: parseInt(StuRollNu),
          StuMobileNo: Number(StuMobileNo),
          StuAge: Number(StuAge),
        });
        await DocCollection.save();
        resp
          .status(201)
          .send({ status: "success", messgae: "Data Insert Sucessfully" });
      } else {
        resp
          .status(204)
          .send({ status: "failed", messgae: "ALL filed Are Required" });
      }
    } else {
      resp
        .status(200)
        .send({ status: "failed", messgae: "Email ID Already exists" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
