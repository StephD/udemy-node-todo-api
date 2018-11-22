const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

// const { mongoose } = require('../db/mongoose')
const { Todo } = require('../models/todo')
// const { User } = require('../models/user')

beforeEach(done => {
	Todo.remove({}).then(() => done())
})

describe('POST /todos', () => {
	it('should create new todo', done => {
		const text = 'Test todo text'

		request(app)
			.post('/todos')
			.send({
				text,
			})
			.expect(200)
			.expect(res => {
				expect(res.body.text).toBe(text)
			})
			.end((err, res) => {
				if (err) return done(err)
				Todo.find()
					.then(todos => {
						expect(todos.length).toBe(1)
						expect(todos[0].text).toBe(text)
						done()
					})
					.catch(e => done(e))
			})
	})

	it('Should not create todo with invalide data', () => {
		const text = 's'

		request(app)
			.post('/todos')
			.send({ text })
			.expect(400)
			.end((err, res) => {
				if (err) return done(err)
				Todo.find()
					.then(todos => {
						console.log(todos)
						expect(todos.length).toBe(1)
						expect(todos[0].text).toBe(text)
						done()
					})
					.catch(e => done(e))
			})
	})
})
