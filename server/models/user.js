const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		// unique: true,
		validate: {
			validator: value => validator.isEmail(value),
			message: '{VALUE} is not a valid email',
		},
	},
	password: { type: String, require: true, minlength: 3 },
	tokens: [
		{
			access: { type: String, require: true },
			token: { type: String, require: true },
		},
	],
})

UserSchema.methods.generateAuthToken = function() {
	let user = this
	const access = 'auth'
	const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString()

	user.tokens = user.tokens.concat([{ access, token }])
	return user.save().then(() => token)
}

UserSchema.methods.toJSON = function() {
	let user = this
	const userObject = user.toObject()

	return _.pick(userObject, ['_id', 'email'])
}

const User = mongoose.model('User', UserSchema, 'Users')

const findByToken = User => {}
const generateAuthToken = () => {}

module.exports = { User, findByToken }
