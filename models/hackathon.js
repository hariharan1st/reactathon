var db = require("../config/db.js");

var hackathonSchema = db.Schema({
    name:String,
    description:String,
    last_date:Date,
    tech_stack:String,
    organizer:String,
    min_team_size:Number,
    max_team_size:Number,
});


var Hackathon = db.model("Hackathon", hackathonSchema, "Hackathons")

module.exports = Hackathon