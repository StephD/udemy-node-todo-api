require('./config/config')

const express = require('express')
const app = express()
const bp = require('body-parser')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const { authenticate } = require('./middleware/authenticate')

const port = process.env.PORT

app.use(bp.json())

app.get('/', (req, res) => {
	res.send('Hello')
})

app.post('/todos', authenticate, (req, res) => {
	const todo = new Todo({ text: req.body.text, _creator: req.user._id })
	todo.save().then(doc => res.send(doc), e => res.status(400).send(e))
})

app.post('/users', (req, res) => {
	const body = _.pick(req.body, ['email', 'password'])
	const user = new User(body)

	user
		.save()
		.then(() => user.generateAuthToken())
		.then(token => res.header('x-auth', token).send(user))
		.catch(e => res.status(400).send(e))
})

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user)
})

app.post('/login', (req, res) => {
	const body = _.pick(req.body, ['email', 'password'])

	User.findByCredentials(body.email, body.password)
		.then(user => {
			// res.send(user)
			return user.generateAuthToken().then(token => {
				res.header('x-auth', token).send(user)
			})
		})
		.catch(e => res.status(400).send(e))
})

app.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(
		() => {
			res.status(200).send()
		},
		() => {
			res.status(400).send()
		},
	)
})

app.get('/todos', authenticate, (req, res) => {
	Todo.find({ _creator: req.user._id }).then(
		todos => res.send({ todos }),
		e => res.status(400).send(e),
	)
})

app.get('/todos/:id', authenticate, (req, res) => {
	let id = req.params.id

	if (!ObjectID.isValid(id)) return res.status(400).send("Id isn't a correct number")

	Todo.findOne({ _id: id, _creator: req.user._id })
		.then(
			todo => {
				if (!todo) return res.status(400).send('Todo not find')
				res.send(todo)
			},
			e => res.status(400).send('Something wrong : ' + e),
		)
		.catch(e => res.status(400).send('Something wrong : ' + e))
})

app.delete('/todos/:id', authenticate, (req, res) => {
	let id = req.params.id

	if (!ObjectID.isValid(id)) return res.status(400).send("Id isn't a correct ID")

	Todo.findOneAndRemove({ _id: id, _creator: req.user._id })
		.then(
			todo => {
				if (!todo) return res.status(400).send('Todo not find')
				res.send(todo)
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
