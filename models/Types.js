var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeSchema = new Schema({
	name: {type: String}
}, {versionKey: false});

mongoose.model('Type', TypeSchema);