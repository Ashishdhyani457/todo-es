const jwt=require("jsonwebtoken")
module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        jwt.verify(token,"your_strong_salt_secret");
        next();
    }
    catch(e){
        res.status(401).json({
            status:{
                message:"Auth Failed",
                code:401,
            }
        })
    }
  
}