const express=require("express")
const userRouter=express.Router()
const userModel=require("../model/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const passport=require("../connection/Oauth");


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



   //------------------- Google Auth Here -----------------------------------------
userRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ['profile', 'email'] })
  );
  
  userRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
  
  
    async function (req, res) {
        try {
            const fetch_user = await userModel.findOne({ email: req.user.email });
            console.log(fetch_user)
          
          
            if (fetch_user) {
                token_Generator(res, fetch_user.name, fetch_user._id, fetch_user.image);
            } else {
                bcrypt.hash("password", 2, async (err, hash) => {
                    const newUser = new userModel({
                        name: req.user.name,
                        email: req.user.email,
                        password: hash,
                        image : req.user.avatar
                    });
                    await newUser.save();
                    console.log(newUser);
                   
                    token_Generator(res, req.user.name, "login with google",req.user.avatar);
                });
            }
        } catch (error) {
            res.status(500).send({ msg: "An error occurred while authenticating with Google" });
        }
    }
);



function token_Generator(res, name, id,image) {
    let token = jwt.sign(
        { user: name, userID:id},
        "kiran",
        { expiresIn: "6h" }
    );
    
    const redirectUrl = `http://127.0.0.1:5501/frontend/index.html?token=${token}&username=${name}&image=${image}`;

    res.redirect(redirectUrl);
}



   module.exports=userRouter