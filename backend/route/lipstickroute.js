const express=require("express")
const lipstickroute=express.Router()
const lipstickmodel=require("../model/lipstickmodel")

lipstickroute.post("/post",async (req,res)=>{
      try {
        const data=new lipstickmodel(req.body)
        await data.save()
        res.status(200).send({"msg":"posted data successfully"})
      } catch (error) {
        res.status(400).send({"msg":error.message})
      }
})
module.exports=lipstickroute