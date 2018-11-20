// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')
const mongoUrl = 'mongodb://localhost:27017'

MongoClient.connect(
	'mongodb://localhost:27017' + '/TodoApp',
	(err, client) => {
		if (err) return console.log('Unable to connect to the DB server')
		const db = client.db('TodoApp')

		db.collection('Todos')
			.findOneAndUpdate(
				{ _id: new ObjectID('123') },
				{ $set: { completed: true } },
				{ returnOriginal: false },
			)
			.then(res => console.log(res))

		db.collection('Users')
			.findOneAndUpdate(
				{ name: 'Jen' },
				{ $set: { name: 'Steph' }, $inc: { age: 1 } },
				{ returnOriginal: false },
			)
			.then(res => console.log(res))

		client.close()
	},
)
