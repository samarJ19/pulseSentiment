import { ROLE } from "@prisma/client";
import prisma from "../config/db";
import bcrypt from "bcrypt";
import { saltRounds } from "..";


export const storeUser = async (email:string,password:string,role:ROLE)=>{
  try{
    let user = await prisma.user.findUnique({
      select:{
        id:true
      },
      where:{
        email:email
      }
    });
    if(user){
      //send back the request to service layer with the message/error that user already exist 
      // with the same email
      console.log("User already exist with the email: ",email);
      //return this message to service layer
      return {
        error: "User already exist with the given email"
      };
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user = await prisma.user.create({
      data:{
        email:email,
        password:hashedPassword,
        role:role
      }
    });
    return {
      userId : user.id,
      role: role
    };

  }catch(error){
    console.log("Got the following error while registering user to database: ",error);
    return null;
  }
};

export const loginUser = async (email:string,password:string) =>{
  try{
    let user = await prisma.user.findUnique({
      where:{
        email:email
      }
    });
    if(!user){
      return {
        error: "User does not exist with the given email"
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return {
        error: "Invalid password"
      };
    }
    return {
      userId: user.id,
      role: user.role
    };
  }catch(error){
    console.log("Got the following error while logging in user: ",error);
    return null;
  }
};