const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.set('view engine','ejs');
app.set('views','./views');

app.use(cookieParser('mySecretKey'));
const cookieConfig = {
  httpOnly:true,
  maxAge:60*1000,
  signed:true,
}
app.get('/',(req,res)=>{
  res.render('index');
})

app.get('/setCookie',(req,res)=>{
  res.cookie('myCookie','IcanseeValue',cookieConfig);
  res.send('set Cookie!');
})

app.get('/getCookie',(req,res)=>{
  //res.send(req.headers.cookie);
  res.send(req.signedCookies);
})

app.get('/clearCookie',(req,res)=>{
  res.clearCookie('myCookie','IcanseeValue',cookieConfig);
  res.send('clear cookie!');
})

app.listen(8000,()=>{
  console.log('8000번 포트에서 서버 실행중 . . .')
})