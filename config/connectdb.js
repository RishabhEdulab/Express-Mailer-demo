import mongoose from "mongoose";
const connectdb=async (DATABASE_URL)=>{
    try{
        const DATBASE_OPTION = {
            dbName: "demo",
          };
       await mongoose.connect(DATABASE_URL,DATBASE_OPTION)
        console.log("connection")
       
           
        
        
     
        
    }catch(error){
        console.log(error);
    }
}
export default connectdb;