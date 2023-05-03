import express from 'express';
import StudentModel from '../model/UserModel.js';


var CheckAlready=(Email)=>{
    const CHeck=StudentModel.exists({StuEmail:Email})
    if(CHeck){
    return true;
    }else{
        return false;
    }
}
   
    
    

export default CheckAlready