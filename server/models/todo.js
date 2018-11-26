const mongoose = require('mongoose')

// Describe an object
// collection will be automaticly plurial
const Todo = mongoose.model(
	'Todo',
	{
		text: { type: String, required: true, minlength: 1, trim: true },
		completed: { type: Boolean, default: false },
		completedAt: { type: Number, default: null },
		_creator: { type: mongoose.Schema.Types.ObjectId, required: true },
	},
	'Todos',
)

module.exports = { Todo }
