const { SHA256 } = require('crypto-js')

const msg = 'I am user number 3'
const hash = SHA256(msg).toString()
const salt = 'somesecret'

console.log(`Message : ${msg}`)
console.log(`Hash : ${hash}`)

const data = {
	id: 4,
}

const token = {
	data,
	hash: SHA256(JSON.stringify(data) + salt).toString(),
}

token.data.id = 5
token.hash = SHA256(JSON.stringify(token.data)).toString()

const resultHash = SHA256(JSON.stringify(token.data) + salt).toString()
if (resultHash == token.hash) console.log('Data has not been change')
else console.log("Don't trust this data")
