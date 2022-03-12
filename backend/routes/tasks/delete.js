const Task=require('../../models/Tasks')
module.exports={
deleteTask:(req,res,next)=>{
    Task.deleteOne({_id:req.params.id,creator:req.userData.userId}).then((result)=>{
        
        // res.json({
        //     status:{
        //         message:"sucessfully",code:201
        //     }
        // })
        
        console.log(result);
        if(result.deletedCount>0){
            res.json({
                status: {
                    messange: "sucessfull",
                    code: 201
                }
            });
        }
        else{
            res.status(401).json({
                status: {
                    messange: "Auth failed",
                    code: 401
                }
            });
        }
   

    })
} 
}