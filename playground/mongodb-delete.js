// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')
const mongoUrl = 'mongodb://localhost:27017'

MongoClient.connect(
	'mongodb://localhost:27017',
	{ useNewUrlParser: true },
	(err, client) => {
		if (err) return console.log('Unable to connect to the DB server')
		const db = client.db('TodoApp')

		// deleteOne
		db.collection('Todos')
			.deleteOne({ text: 'Eat fruits' })
			.then(res => {
				console.log('DeleteOne', res.results) // 'ok' and 'n'
			})

		// deleteMany
		// db.collection('Todos')
		// 	.deleteMany({ text: 'Something to do' })
		// 	.then(res => {
		// 		console.log(res.result) // 'ok' and 'n'
		// 	})

		// findOneandDelete
		db.collection('Todos')
			.findOneAndDelete({ completed: false })
			.then(res => {
				console.log('findOneAndDelete', res)
			})

		db.collection('Users').deleteMany({ name: 'Steph' })

		db.collection('Users')
			.findOneAndDelete({ _id: new ObjectID('5bf3ca7b9fb1c2175043494a') })
			.then(res => {
				console.log(JSON.stringify(res, undefined, 2))
			})

		client.close()
	},
)
