const Task=require('../../models/Tasks')
module.exports={
updateTask: (req,res,next)=>{

    const url=req.protocol+"://"+req.get("host");
    let imagePath=req.body.imagePath;
    if(req.file){
        imagePath= url + '/images/' + req.file.filename
    }
    const task = new Task({
        _id:req.body._id,
        title: req.body.title,
        description: req.body.description,
        imagePath: imagePath
    });
    Task.updateOne({_id:req.body._id, creator:req.userData.userId},task).then((result)=>{
        console.log(result);
        if(result.modifiedCount>0){
            res.json({
                status: {
                    message: "sucessfull",
                    code: 201
                }, data: task
            });
        }
        else{
            res.status(401).json({
                status: {
                    message: "Auth failed",
                    code: 401
                }, data: task
            });
        }
   
    }).catch(e=>{
        res.status(500).json({
            status: {
                message: e.message,
                code: 500
            }
        });
    })

}
}