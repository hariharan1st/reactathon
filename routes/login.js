var express = require("express");
var loginRouter = express.Router();
var userModel = require("../models/users");

loginRouter.post("/", function(req,res, next){
    var query = {username:req.body.username, password:req.body.password};
    userModel.findOne(query, function(err,result){
        if(err) throw err;
        if(result == null){
            console.log("login again");
            res.redirect("/");
        }
        else{   
            req.session.user = result._id;
            res.redirect("/hackathon/hackathon-list");
            next();
        }
    });
});

loginRouter.get("/register", function(req,res,next){
    res.render("register.pug", { message:req.session.message });
});

loginRouter.post("/register", function(req,res,next){
    if(!req.body.username || !req.body.password){
        req.session.message = "Please enter user name and password to register"
        res.redirect("/login/register");
    }
    else{

        var newUser = new userModel({
            username:req.body.username,
            password:req.body.password
        });
        newUser.save(function(err,user){
            if(err){
                next(new Error("Database error! Try Again"));
            }
            else{
                req.session.user = user._id;
                res.redirect("/hackathon/hackathon-list");
                next();
            }
        });
    }
});

module.exports=loginRouter