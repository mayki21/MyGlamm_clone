const express=require("express")
const cors=require("cors")
require("dotenv").config()
const connection=require("./connection/db")
const userrouter=require("./route/userrouter")
const makeuproute = require("./route/makeuproute")
const skincareroute=require("./route/skincareroute")
const lipstickroute = require("./route/lipstickroute")
const cartroute=require("./route/cartroute")
const auth=require("./middleware/auth")
const duplicate=require("./middleware/duplicate")

// const auth=require("./middleware/auth")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/user",userrouter)

app.use("/makeup",makeuproute)
app.use("/skincare",skincareroute)
app.use("/lipstick",lipstickroute)
app.use(auth)
app.use(duplicate)
app.use("/cart",cartroute)









app.listen(process.env.port,async()=>{
    await connection
    console.log("connected to DB")
})



