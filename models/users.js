var db = require("../config/db.js").dbClient;

var userSchema = db.Schema({
    username:String,
    password:String
});
var Users = db.model("Users", userSchema, "Users")

exports.Users = Users