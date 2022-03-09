const Task=require('../../models/Tasks')


module.exports={
createTask: (req, res, next) => {
    const url=req.protocol+"://"+req.get("host");
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        imagePath: url + '/images/' + req.file.filename
    })
    task.save();
    console.log(task);
    res.json({
        status: {
            message: "sucessfully", code: 201
        }
    })
}
}