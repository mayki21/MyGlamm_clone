const express=require("express")
const lipstickroute=express.Router()
const lipstickmodel=require("../model/lipstickmodel")

lipstickroute.get("/",async (req,res)=>{
  try {
    const data=await lipstickmodel.find()
    res.status(200).send(data)

  } catch (error) {
    res.status(400).send({"msg":error.message})
  }
})

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