var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IntroSchema = new Schema({
	text: {type: String}
}, {versionKey: false});

mongoose.model('Intro', IntroSchema);