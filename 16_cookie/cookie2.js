const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();

app.set('view engine','ejs');
app.set('views','./views');

const cookieConfig2 ={
    path : "/abc",
    Maxage : 60*1000,
    httpOnly : true,
}

app.get("/",(req,res)=>{
    res.render('cookie')
})

app.get("/abc",(req,res)=>{
    res.cookie('abc-page','abc page cookie',cookieConfig2);
    res.render('another')
})


app.listen(8000,()=>{
    console.log('8000 server2')
})