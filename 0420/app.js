const crypto = require('crypto');

// randomBytes 128바이트 생성
crypto.randomBytes(128, (err,buf)=>{
    if(err){
        console.log(err);
        return;
    }
    //console.log('The random data is :', buf)
    // console.log('The random data is :', buf.toString("base64"))
    console.log('The random data is :', + buf.toString("base64"))
})
