var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDB');


exports.dbClient = mongoose;