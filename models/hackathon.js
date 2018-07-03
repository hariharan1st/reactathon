var db = require("../config/db.js");

var hackathonSchema = db.Schema({
    name:String,
    summary:String,
    tech_stack:String,
    organizer:String,
    min_team_size:Number,
    max_team_size:Number,
    last_date:Date
});


var Hackathon = db.model("Hackathon", hackathonSchema, "Hackathons")

module.exports = Hackathon