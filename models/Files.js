var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
	file_name: {type: String},
	path: {type: String},
	associated_sculpture: {type: String},
	type: {type: String}
}, {versionKey: false});

mongoose.model('File', FileSchema);