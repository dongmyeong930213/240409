const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const PORT = 3000;
const SECRET = '9PBYbnIhfXEVQdeXrvPWrX6ydDAJkIqVdfjfsahf';

app.set('view engine','ejs')
app.set('views','./views')
app.use(express.urlencoded({extended:true}));
app.use(express.json())

const userInfo = { id: 'dong', pw:'1234', name:'myeong', age : 33};

app.get('/',(req,res)=>{
    res.render('indexp')
})


app.get('/login1',(req,res)=>{
    res.render('login1');
});

// 로그인 요청
app.post('/login1',(req,res)=>{
    try{
        const { id, pw} = req.body;
        const { id: realId, pw:realPw, name, age} = userInfo;
    
        if (id === realId && pw === realPw){
            const token = jwt.sign({id, name, age}, SECRET);
            res.send({isLogin: true, token });
        } else{
            res.send({isLogin: false, msg:'로그인 정보가 없습니다' });
        }
    } catch(err){
        console.error(err);
    }
});

// 토큰검증
app.post('/token',(req,res)=>{
    console.log('token >', req.headers.authorization);
    if(req.headers.authorization){
        const authorization = req.headers.authorization.split(' ');
        console.log('authorization -->', authorization); // ['Bearer','토큰스트링']
        const token = authorization[1];

        try{
            const result = jwt.verify(token,SECRET);
            console.log('verify result >', result);
            if(result.id === userInfo.id){
                res.send({isVerify : true, name: result.name, age: result.age});
            } else {
                res.send({isVerify : false, msg : "잘못된 접근입니다"});
            }
        } catch (err){
            console.log('verify Error ', err);
            res.send({isVerify: false, msg : '인증된 회원이 아닙니다'});
        }

    } else{
        res.redirect('/login1');
    }
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});