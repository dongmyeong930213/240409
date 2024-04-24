const express = require('express')
const app= express()
const multer = require('multer');
const path = require('path')
const abc = multer({dest : 'uploads/'})
// 불러오는 파일에 대한 정보
const uploadDetail = multer({
  storage:multer.diskStorage({
    destination(req,file,cb){
      cb(null,'uploads/')
    },
    filename(req,file,cb){
      const ext=path.extname(file.originalname) // 확장자만
      file.originalname= Buffer.from(file.originalname,'latin1').toString('utf-8')
      console.log(path.basename(file.originalname,ext) ) // 파일이름만
      cb(null, path.basename(file.originalname,ext) + Date.now() + ext)
    }
  }),
  limits:{
    fileSize: 5*1024*1024 // 5MB
  }
})
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded({extended:true}));
app.use(express.json())
// 이미지경로 등록
app.use('/uploads', express.static(__dirname+'/uploads'))
app.get('/',(req,res)=>{
  res.render('index1')
})
app.post('/dynamic', uploadDetail.single('dynamicFile'), (req,res)=>{
  res.send({file:req.file, title:req.body.title})
})
app.listen(1000, ()=>{
  console.log('1000 서버실행 중')
})