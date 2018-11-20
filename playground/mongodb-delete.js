// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')
const mongoUrl = 'mongodb://localhost:27017'

MongoClient.connect(
	'mongodb://localhost:27017' + '/TodoApp',
	(err, client) => {
		if (err) return console.log('Unable to connect to the DB server')
		const db = client.db('TodoApp')

		// deleteOne
		db.collection('Todos')
			.deleteOne({ text: 'Eat fruits' })
			.then(res => {
				console.log(res.results) // 'ok' and 'n'
			})

		// deleteMany
		db.collection('Todos')
			.deleteMany({ text: 'Eat fruits' })
			.then(res => {
				console.log(res.results) // 'ok' and 'n'
			})

		// findOneandDelete
		db.collection('Todos')
			.findOneAndDelete({ completed: false })
			.then(res => {
				console.log(res)
			})

		db.collection('Users').deleteMany({ name: 'Andrew' })
		db.collection('Users')
			.findOneAndDelete({ _id: new ObjectID('123') })
			.then(res => {
				console.log(JSON.stringify(res, undefined, 2))
			})

		client.close()
	},
)
