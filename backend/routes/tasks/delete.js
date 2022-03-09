const Task=require('../../models/Tasks')
module.exports={
deleteTask:(req,res,next)=>{
    Task.deleteOne({_id:req.params.id}).then(()=>{
        res.json({
            status:{
                message:"sucessfully",code:201
            }
        })
    })
} 
}