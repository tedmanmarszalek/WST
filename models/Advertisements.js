var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdvertisementSchema = new Schema({
	name: {type: String},
	path: {type: String},
	active: {type: Boolean}
}, {versionKey: false});

mongoose.model('Advertisement', AdvertisementSchema);