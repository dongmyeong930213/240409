/**
 *  1. crypto는 단방향 암호화 구현
 *  createHash() : 지정한 해시 알고리즘으로 해시 객체를 생성하는 암호화 방식
 *  password를 sha512 알고리즘 방식으로 암호화 하고,
 *  base64 방식으로 인코딩하여 리턴하는 함수
 */
const crypto = require('crypto'); // 모듈 불러오기
const createHashedPW = (password)=>{
    return crypto.createHash('sha512').update(password).digest('base64')

} 
console.log(createHashedPW('1234'))
console.log(createHashedPW('1234'))
console.log(createHashedPW('5678'))

