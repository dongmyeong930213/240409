const jwt = require ('jsonwebtoken');
// const payLoad = { foo : 'bar' };
// const secretKey = 'mySecretKey';

// const jwtToken = jwt.sign(payLoad,secretKey)
// console.log(jwtToken)


const token = jwt.sign({ email : "test@user.com "}, "our_secret");

const  verified = jwt.verify(token, "our_secret");
console.log(verified);