const mongoose=require("mongoose")

const skincareSchema=mongoose.Schema({
    id: Number,
    img:String,
    name: String,
    description:String,
    offerPrice:  Number,
    actualPrice: Number
},{
    versionKey:false
})

const skincaremodel=mongoose.model("skincare",skincareSchema)
module.exports=skincaremodel