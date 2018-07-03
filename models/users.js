var db = require("../config/db.js");

var userSchema = db.Schema({
    username:String,
    password:String
});
var Users = db.model("Users", userSchema, "Users")

module.exports = Users