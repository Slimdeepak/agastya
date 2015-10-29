var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3001;
var bodyParser      = require('body-parser');
var app             = express();

// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/deepakdb");

// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to p
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents                                       // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json

// Routes
// ------------------------------------------------------
require('./app/route.js')(app);

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

