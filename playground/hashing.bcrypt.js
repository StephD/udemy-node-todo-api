const bcrypt = require('bcryptjs')
const secret = '123abc'

// const salt = bcrypt.genSaltSync(10)
// const hash = bcrypt.hashSync(secret, salt)
const hash = bcrypt.hashSync(secret, 8)

console.log(hash)

const hash2 = '$2a$08$zOjT1wHqIIt/AbCe3oqQWOGacG3GHKNvulVU4ZWGi4ZZoKRZyPJuK'

if (bcrypt.compareSync(secret, hash2)) console.log("it's good")
else console.log('not good')
