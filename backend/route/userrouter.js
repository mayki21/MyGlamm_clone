const express=require("express")
const userRouter=express.Router()
const userModel=require("../model/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


userRouter.post("/register",async(req,res)=>{
   try 
   {
        const {name,email,password,contact}=req.body
        bcrypt.hash(password,4,async(err,hash)=>{
            const user =await userModel({name,email,password:hash,contact})
            await user.save()
            res.status(200).send({"msg":"Registered successful"})
    })
    
   } 
   catch (error) 
    {
        res.status(400).send({"msg":"some error occured"})
        
    }  

})

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const data=await userModel.findOne({email})
    console.log(data)
    if(data)
    {
        bcrypt.compare(password,data.password,async (err,result)=>{
            if(result)
            {
                res.status(200).send({"msg":"Login Successfull","token":jwt.sign({userID:data._id},"kiran",{expiresIn:"6h"}),"userdetail":data})
            }
            else{
                res.status(400).send({"msg":"wrong credentials"})
            }
        })
    }
    else
    {
        res.status(404).send({"msg":"user not found"})
    }

   })

   module.exports=userRouter