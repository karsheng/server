const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model
const userScheme = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});


// Create the model class
const ModelClass = mongoose.mode('user', userScheme);

// Export the model
module.exports = ModelClass;