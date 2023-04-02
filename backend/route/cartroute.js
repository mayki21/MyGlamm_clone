const express=require("express")
const jwt=require("jsonwebtoken")
const cartroute=express.Router()
const cartmodel=require("../model/cartmodel")



cartroute.get("/",async (req,res)=>{
  try {
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"kiran")
      const data = await cartmodel.find({"userID":decoded.userID})
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

cartroute.patch("/incpatch/:id",async (req,res)=>{
  const {id}=req.params
  const data=await cartmodel.findByIdAndUpdate({_id:id},{$inc:{quantity:1}})
  console.log(data)
  res.status(200).send({"msg":"Data updated",data:data})
})

cartroute.patch("/decpatch/:id",async (req,res)=>{
  const {id}=req.params
  const data=await cartmodel.findByIdAndUpdate({_id:id},{$inc:{quantity:-1}})
  console.log(data)
  res.status(200).send({"msg":"Data updated",data:data})
})

cartroute.delete("/delete/:id",async (req,res)=>{
  const {id}=req.params
  const data=await cartmodel.findByIdAndDelete({_id:id})
  console.log(data)
  res.status(200).send({"msg":"Data updated",data:data})
})



module.exports=cartroute