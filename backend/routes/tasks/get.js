const Task=require('../../models/Tasks')
module.exports={
getById:(req, res, next) => {
    Task.findById(req.params.id).then(task=>{
        res.json({
            status: {
                messange: "sucessfull",
                code: 200
            }, data: task
        });
    })
    
},getAll:(req, res, next) => {
   
    const pageSize= +req.query.pagesize;
    const currentPage= +req.query.currentpage;
    const taskQuery=Task.find();
    if(pageSize && (currentPage)>-1 ){
        taskQuery.skip( pageSize * (currentPage))
        .limit(pageSize)
    }
    taskQuery.find().then(async tasks=>{
        res.json({
            status: {
                messange: "sucessfull",
                code: 200
            }, data: tasks,
            totalCount:await Task.count()
        });
    })
    
}

}