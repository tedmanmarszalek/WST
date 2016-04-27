var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
	name: {type: String},
	coordinates_latitude: {type: Number},
	coordinates_longitude: {type: Number}, 
	active: {type: Boolean}
}, {versionKey: false});

mongoose.model('Location', LocationSchema);