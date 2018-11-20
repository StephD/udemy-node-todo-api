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

		db.collection('Todos')
			.find()
			.count()
			.then(
				count => {
					console.log(`There is ${count} todo`)
				},
				err => {
					console.log('Unable to fetch')
				},
			)

		db.collection('Users')
			.find({ name: 'Steph' })
			.toArray()
			.then(
				docs => {
					console.log(JSON.stringify(docs, undefined, 2))
				},
				err => {
					console.log('Unable to fetch')
				},
			)

		// db.collection('Todos')
		// 	// .find()
		// 	// .find({ completed: true }) // "where"
		// 	.find({ _id: new ObjectID('5bf3b024f49586612c665cb5') }) // "where"
		// 	.toArray()
		// 	.then(
		// 		res => {
		// 			console.log('Todos')
		// 			console.log(JSON.stringify(res, undefined, 2))
		// 		},
		// 		err => {
		// 			console.log('Unable to fetch')
		// 		},
		// 	)

		client.close()
	},
)
