const express = require('express')
const session = require('express-session')
const app = express();
const PORT = 8000;

app.set('view engine','ejs')
app.use('/static',express.static(__dirname + '/static'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret:"secretKey",
    resave:false,
    saveUninitialized: false,
    cookie:{
        httpOnly:true,
        maxAge:60*1000
    }
}))

const userInfo = { id: "banana", pw:"1234"}


app.get("/",(req,res)=>{
    const user = req.session.user
    if( user !== undefined){
        res.render('index', {isLogin:true, user: user })
    }else{
        res.render('index', {isLogin:false })
    }

})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{
    const { id,pw } = req.body
    console.log(id,pw)
    if(id=== userInfo.id  && pw=== userInfo.pw){
        req.session.user=id;
        res.redirect("/")
    } else{
        res.send('로그인 실패')
    }

})

app.get('/logout',(req,res)=>{
    const user = req.session.user;
    if(user !== undefined){
        req.session.destroy(err =>{
            res.redirect('/')
        })
    } else {
        res.send('잘못된 접근입니다')
    }
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})