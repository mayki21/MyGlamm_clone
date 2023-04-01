const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    let token = req.headers.authorization
    if(token)
    {
        jwt.verify(token,"kiran",function (err,decoded){
            if(decoded)
            {
                req.body.userID=decoded.userID
                next()
            }
            else{
                res.send({"msg":"wring credentials"})
            }
        })
    }
    else
    {
        res.send({"msg":"please login !!"})
    }
}
module.exports=auth