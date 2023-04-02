const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({
    id : String,
    img: String,
    name: String,
    description: String ,
    plus: String,
    count: String ,
    offerPrice:  Number,
    actualPrice:  Number,
    userID:String,
    quantity:Number
},{
    versionKey:false
})

const cartmodel=mongoose.model("cart",cartSchema)
module.exports=cartmodel