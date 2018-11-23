const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const url = process.env.MONGODB_URI || 'mongodb://localhost:' + port

mongoose.Promise = global.Promise
mongoose.connect(url + '/TodoApp')

module.exports = {
	mongoose,
}
