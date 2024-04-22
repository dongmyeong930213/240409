const bcrypt = require('bcrypt');
const saltRounds = 11;

// 비밀번호 암호화
const bcryptPassword = (password) =>bcrypt.hash(password, saltRounds);

//비밀번호 비교
const compareFunc = (password, dbPassword) => bcrypt.compare(password, dbPassword)

module.exports = {
    bcryptPassword,
    compareFunc
}