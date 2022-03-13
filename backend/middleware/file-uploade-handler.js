const multer=require('multer');
const { model } = require('../models/User');
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
module.exports=multer({storage:storage}).single('image')