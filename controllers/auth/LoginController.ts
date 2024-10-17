import { Request, Response } from "express";
import { userModel } from "../../models/userModel";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


const JWT_SECRET = 'fgvhjijuhygtfrhgjkhjygthgf'

export const LoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      throw new Error("Email does not exist");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({userId:existingUser._id},JWT_SECRET,{expiresIn:'1h'})

    res.cookie('authToken',token,{
      // httpOnly:true,
      maxAge:3600000,
      sameSite:'strict'
    })

    res.status(200).json({
      data: existingUser,
      success: true,
      error: false,
      message: "Login successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
