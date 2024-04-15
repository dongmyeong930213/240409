const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views','./views')
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());
const cookieConfig = {
    maxAge : 24 * 60 * 60 * 1000

}



app.get("/",(req,res)=>{
    console.log('req.cookies.popup --> ', req.cookies.popup)
    res.render('index', {popup:req.cookies.popup})
})

app.post("/setCookie",(req,res)=>{
    //쿠키 생성 - > 쿠키를 생성해서 시간제한 설정
    res.cookie('popup','hide',cookieConfig)
    res.send('쿠키설정 성공')
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})