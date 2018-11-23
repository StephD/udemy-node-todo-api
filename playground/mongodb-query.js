const { ObjectID } = require('mongodb')
const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

const id = '5bf6876c0c5600a009f45a0e'

if (!ObjectID.isValid(id)) return console.log("Id isn't a correct number")

// Todo.find({ _id: id }).then(res => console.log(res))
// Todo.findOne().then(res => console.log(res))
Todo.findById(id)
	.then(res => {
		if (!res) return console.log('Not found')
		console.log(res)
	})
	.catch(e => console.log(e))
