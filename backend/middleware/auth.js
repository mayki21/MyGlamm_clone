const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    let token = req.headers.authorization
    if(token)
    {
        jwt.verify(token,"kiran",function (err,decoded){
            console.log(decoded)
            if(decoded)
            {
                req.body.userID=decoded.userID
                req.body.quantity=1
                next()
            }
            else{
                res.send({"msg":"wrong credentials"})
            }
        })
    }
    else
    {
        res.send({"msg":"please login !!"})
    }
}
module.exports=auth