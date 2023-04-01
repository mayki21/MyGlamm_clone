const express=require("express")
const cartroute=express.Router()
const cartmodel=require("../model/cartmodel")



cartroute.get("/",async (req,res)=>{
  try {
    const data=await cartmodel.find()
    res.status(200).send(data)

  } catch (error) {

    res.status(400).send({"msg":error.message})
    
  }
  
})

cartroute.post("/post",async (req,res)=>{
      try {
        const data=new cartmodel(req.body)
        await data.save()
        res.status(200).send({"msg":"posted data successfully"})
      } catch (error) {
        res.status(400).send({"msg":error.message})
      }
})
module.exports=cartroute