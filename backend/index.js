const express=require("express")
const cors=require("cors")
require("dotenv").config()
const connection=require("./connection/db")
const userrouter=require("./route/userrouter")
const makeuproute = require("./route/makeuproute")
const skincareroute=require("./route/skincareroute")
const lipstickroute = require("./route/lipstickroute")

// const auth=require("./middleware/auth")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/user",userrouter)
// app.use(auth)
app.use("/makeup",makeuproute)
app.use("/skincare",skincareroute)
app.use("/lipstick",lipstickroute)








app.listen(process.env.port,async()=>{
    await connection
    console.log("connected to DB")
})



