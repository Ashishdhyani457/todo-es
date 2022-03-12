const jwt=require("jsonwebtoken")
module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
       const decodedToken= jwt.verify(token,"your_strong_salt_secret");
       req.userData={email:decodedToken.email,userId: decodedToken.userId }
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