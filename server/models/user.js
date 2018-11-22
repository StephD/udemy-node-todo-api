const mongoose = require('mongoose')

const User = mongoose.model(
	'User',
	{
		email: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
		},
	},
	'Users',
)

module.exports = {
	User,
}
