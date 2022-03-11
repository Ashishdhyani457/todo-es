
const express=require('express');
const router=express.Router({mergeParam:true});
const checkAuth=require("../../middleware/check-auth");
const multer=require('multer');
const MINE_TYPE_MAP={
'image/png':'png',
'image/jpeg':'jpg',
'image/jpg':'jpg'
}
const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        const name=file.originalname.toLowerCase().split(' ').join("-");
        const ext=MINE_TYPE_MAP[file.mimetype];
        cb(null,name+"-"+Date.now()+'.'+ext);
},destination:(req,file,cb)=>{
    const isValid=MINE_TYPE_MAP[file.mimetype];
    let error=new Error('Invalid mime type');
    if(isValid){ 
        error=null;
    }
    cb(error,'images')
}
})


let get=require('./get');
let put=require('./put');
let post=require('./post');
let del=require('./delete');

router.get('/',get.getAll);
router.get('/:id',get.getById);


router.post('/',checkAuth,multer({storage:storage}).single('image'),post.createTask);
router.put('/:id',checkAuth,multer({storage:storage}).single('image'),put.updateTask);
router.delete('/:id',checkAuth,del.deleteTask);
module.exports=router;