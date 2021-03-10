const bcrypt = require('bcrypt');
// 해시 password를 만드는데 사용된다.

let pswrd = bcrypt.hashSync('12345', 9);
console.log(pswrd)
