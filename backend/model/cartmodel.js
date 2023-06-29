const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({
    // id : String,
    // img: String,
    // name: String,
    // description: String ,
    // plus: String,
    // count: String ,
    // offerPrice:  Number,
    // actualPrice:  Number,
    // userID:String,
    // quantity:Number,
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "user"},

    lipsticks: [
        {
            data: { type: mongoose.Schema.Types.ObjectId, ref: "lipstick" },
            Quantity: {type:Number,default:1,min:1}
        }


    ],
    makeups: [
        {
            data: { type: mongoose.Schema.Types.ObjectId, ref: "makeup" },
            Quantity: {type:Number,default:1,min:1}
        }


    ],
    skincares: [
        {
            data: { type: mongoose.Schema.Types.ObjectId, ref: "skincare" },
            Quantity: {type:Number,default:1,min:1}
        }


    ]

},{
    versionKey:false
})

const cartmodel=mongoose.model("cart",cartSchema)
module.exports=cartmodel