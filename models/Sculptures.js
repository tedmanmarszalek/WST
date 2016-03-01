var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SculptureSchema = new Schema({
	//name: {type: String, unique: true, required: true},
	sculpture_name: {type: String},
	video: {type: String},
	image: {type: String},
	audio: {type: String},
	active: {type: String},
	coordinates: {type: String},
	artist: {type: String},
	artist_statement: {type: String},
}, {versionKey: false});

mongoose.model('Sculpture', SculptureSchema);