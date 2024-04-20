// bcrypt
// : 비밀번호 암호화하는 알고리즘 중 하나
// : 주로 강력한 보안 필요할 때 사용
// : blowfish 암호를 기반으로 설계된 단방향 암호화 함수

const bcrypt = require('bcrypt');
const originalPW ='1234'; // 비밀번호 원본
const saltRounds = 10; // 솔트 라우드 수를 정의
// 비밀번호 해싱함수
function hashPW(password){
return bcrypt.hashSync(password,saltRounds)

}

//비밀번호 원본과 해시된 비밀번호가 일치하는지 확인하는 함수
function comparePW(password, hashedPW){
 return bcrypt.compareSync(password, hashedPW)
}

const hashedPW = hashPW(originalPW)
console.log(`해시된 pw , ${hashedPW}`)

const isMatch = comparePW(originalPW,hashedPW)
console.log(`originalPW === hashedPW, ${isMatch}`)

const isMatch2 = comparePW("5678",hashedPW)
console.log(`originalPW === hashedPW, ${isMatch2}`)