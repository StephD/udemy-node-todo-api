// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')
const mongoUrl = 'mongodb://localhost:27017'

const user = {
	// _id:123, // Ok
	name: 'Steph',
	age: 29,
	email: 'test@test.com',
}

var { name } = user // Destructuring

// const obj = new ObjectID()
// console.log(obj)

MongoClient.connect(
	'mongodb://localhost:27017' + '/TodoApp',
	(err, client) => {
		if (err) return console.log('Unable to connect to the DB server')
		console.log('Connected to MongoDB server')

		const db = client.db('TodoApp')

		db.collection('Todos').insertOne(
			{
				text: 'Something to do',
				completed: false,
			},
			(err, res) => {
				if (err) return console.log('Unable to insert a value')
				console.log(JSON.stringify(res.ops), undefined, 2)
			},
		)

		db.collection('Users').insertOne(user, (err, res) => {
			if (err) return console.log('Unable to insert a value')
			console.log(res.ops[0]._id.getTimestamp())
		})

		client.close()
	},
)
