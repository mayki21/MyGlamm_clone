const express=require("express")
const makeuproute=express.Router()
const makeupmodel=require("../model/makeupmodel")

makeuproute.post("/post",async (req,res)=>{
      try {
        const data=new makeupmodel(req.body)
        await data.save()
        res.status(200).send({"msg":"posted data successfully"})
      } catch (error) {
        res.status(400).send({"msg":error.message})
      }
})
module.exports=makeuproute