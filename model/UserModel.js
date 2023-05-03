import mongoose from "mongoose";
var UserSchema=new mongoose.Schema(
    {
        StuName:String,
        StuEmail:String,
        StuPassword:String,
        StuRollNu:Number,
        StuMobileNo:Number,
        StuAge:Number,
        
    }
)

var StudentModel=mongoose.model("StudentData",UserSchema)

export default StudentModel