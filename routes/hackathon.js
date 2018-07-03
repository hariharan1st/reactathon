var express = require("express");
var hackathonRouter = express.Router();
var hackathonModel = require("../models/hackathon.js");
var authenticationUtil = require("../util/authenticate.js");

hackathonRouter.get("/hackathon-list",authenticationUtil.checkSignIn, function(req,res,next){
        res.render("hackathon-list.pug", {message:"vanakam user with id ::: "+req.session.user});
});

module.exports = hackathonRouter;