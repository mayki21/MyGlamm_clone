const cartmodel=require("../model/cartmodel")

duplicate=async (req,res,next)=>{
    try {
        const data=await cartmodel.findOne({name:req.body.name})
        if(data)
        {
            res.status(200).send({"msg":"Data already present"})

        }
        else{
            next()
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
}

module.exports=duplicate