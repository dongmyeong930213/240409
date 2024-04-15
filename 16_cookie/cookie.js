// cookiejs ,cookie2js 병합

const express =require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.set('view engine','ejs')
app.set('views','./views')


//cookie-parser는 미들웨어로 등록해서 사용
// app.use(cookieParser())

app.use(cookieParser('secretKey'))



//쿠키에 사용될 내용을 설정

const cookieConfig ={
    maxAge : 60* 1000,
    httpOnly : true,
    signed : true,
}

app.get("/", (req,res)=>{
    res.render('cookie')
})

// cookie.ejs에서 쿠키설정하기
app.get('/setCookie',(req,res)=>{
    // 쿠키이름, 쿠키값, 옵션
    res.cookie('myCookie', 'cookiegood',cookieConfig)
    res.send('쿠키설정 완료')
})
//쿠키값 얻어오기
app.get('/getCookie',(req,res)=>{
    console.log('얻어온 암호화 되지 않는 쿠키 : ',req.cookies)
    console.log('얻어온 암호화된 쿠키 : ',req.signedCookies)

})
//쿠키 삭제
app.get('/clearCookie',(req,res)=>{
    res.clearCookie('myCookie', 'cookiegood',cookieConfig)
    res.send('clear cookie')
})

const cookieConfig2 ={
    path : "/abc",
    Maxage : 60*1000,
    httpOnly : true,
}

app.get("/abc",(req,res)=>{
    res.cookie('abc-page','abc page cookie',cookieConfig2);
    res.render('another')
})


/** 암호화되지 않은 일반적인 경우
 * 1. 'cookie-parser' 사용
 * 2. app.use(cookieParser()) 미들웨어로 등록
 * 3. res.cookie(이름, 값, 옵션) -> 쿠키설정
 * 4. req.cookies() -> 쿠키값 확인
 * 5. res.clearCookie(이름, 값, 옵션)
 */


/** 암호화 되는 경우
 * 1. app.use(cookieParser(secretKey))  임의의문자열
 * 2. 옵션에 signed:true, 설정
 * 3. req.signedCookies 객체에서 확인할 수 있다.
 * 
 */

app.listen(8000,()=>{
    console.log('8000 Server')
})