import {Request,Response} from 'express'
import { userModel } from '../../models/userModel.js';
import bcrypt from "bcryptjs";

export const RegisterController = async(req:Request,res:Response)=>{
    
    
    try {
        const {username,email,password} = req.body;
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            throw new Error("User already exists");
        }
        if(!email){
            throw new Error("Please provide email");
        }
        if(!password){
            throw new Error("Please provide password");
        }
        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new userModel({username,email,password:hashPassword})
        await newUser.save();
        res.status(200).json({
            data:newUser,
            success:true,
            error:false,
            message:"Registerd successfully"
        })

        
    } catch (error:any) {
        res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })
        
    }

}