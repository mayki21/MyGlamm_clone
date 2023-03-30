const mongoose=require("mongoose")

const makeupSchema=mongoose.Schema({
    id: Number,
    img: String,
    name: String,
    description: String,
    offerPrice: Number,
    plusiconsrc: String,
    count: Number,
    actualPrice: Number
},{
    versionKey:false
})

const makeupmodel=mongoose.model("makeup",makeupSchema)
module.exports=makeupmodel