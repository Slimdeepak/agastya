// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db
var MySchema = new Schema({
	school: {type: String},
    principal: {type: String},
    contact: {type: String},
    latitude: {type: String},
    longitude: {type: String},
    students :{type: Array}

});


// Exports the MySchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('hackathon', MySchema);
