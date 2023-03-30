const express=require("express")
const skinrouterroute=express.Router()
const skinmodel=require("../model/skincaremodel")

skinrouterroute.post("/post",async (req,res)=>{
      try {
        const data=new skinmodel(req.body)
        await data.save()
        res.status(200).send({"msg":"posted data successfully"})
      } catch (error) {
        res.status(400).send({"msg":error.message})
      }
})
module.exports=skinrouterroute