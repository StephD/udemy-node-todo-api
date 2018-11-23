const express = require('express')
const app = express()
const bp = require('body-parser')

const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const port = process.env.PORT || 3000

app.use(bp.json())

app.get('/', (req, res) => {
	res.send('Hello')
})

app.post('/todos', (req, res) => {
	const todo = new Todo({ text: req.body.text })
	todo.save().then(doc => res.send(doc), e => res.status(400).send(e))
})

app.post('/users', (req, res) => {
	const user = new User({ email: req.body.email })
	user.save().then(doc => res.send(doc), e => res.status(400).send(e))
	// res.status(400).send('Sad')
})

app.get('/todos', (req, res) => {
	Todo.find().then(todos => res.send({ todos }), e => res.status(400).send(e))
})

app.get('/todos/:id', (req, res) => {
	let id = req.params.id

	if (!ObjectID.isValid(id)) return res.status(400).send("Id isn't a correct number")

	Todo.findById(id)
		.then(
			ret => {
				if (!ret) res.status(400).send('Todo not find')
				res.send(ret)
			},
			e => res.status(400).send('Something wrong : ' + e),
		)
		.catch(e => res.status(400).send('Something wrong : ' + e))
})

app.listen(port, () => console.log(`Started on port ${port}`))

module.exports = {
	app,
}

// // const newTodo = new Todo({})
// const newTodo = new Todo({ text: '   Cook dinner   ' })
// // const newTodo = new Todo({ text: 'Cook dinner2', completed: true, completedAt: 2 })
// newTodo.save().then(doc => console.log('Save todo', doc), e => console.log('Unable to save', e))

// const newUser = new User({ email: 'test@test.com' })
// newUser.save().then(doc => console.log(doc), e => console.log(e))
