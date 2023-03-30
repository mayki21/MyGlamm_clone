const mongoose=require("mongoose")

const lipstickSchema=mongoose.Schema({
    id : String,
    img: String,
    name: String,
    description: String ,
    plus: String,
    count: String ,
    offerPrice:  Number,
    actualPrice:  Number
},{
    versionKey:false
})

const lipstickmodel=mongoose.model("lipstick",lipstickSchema)
module.exports=lipstickmodel