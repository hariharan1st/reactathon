var express = require("express");
var hackathonRouter = express.Router();
var hackathonModel = require("../models/hackathon.js");
var util = require("../util/util.js");

hackathonRouter.get("/hackathon-list", function(req,res,next){
        hackathonModel.find({}, function(err, hackathonArray){
                if(err)  next(err);
                hackathonList = [];
                hackathonArray.forEach(function(hackathonDObj){
                        hackathonList.push(hackathonDObj._doc);
                });
                res.render("hackathon-list.pug", {hackathonList: hackathonList});
                next();
        });
});
hackathonRouter.get("/create", function(req,res,next){
        res.render("hackathon-create.pug", { message : util.popSessionValue(req, "message")});
});
hackathonRouter.post("/create", function(req,res,next){
        if(!req.body.name || !req.body.last_date || !req.body.max_team_size || !req.body.organizer){
            req.session.message = "Please enter field values to create";
            res.redirect("/hackathon/create");
        }
        else{
            var newHackathon = new hackathonModel({
                name:req.body.name,
                summary:req.body.summary,
                description:req.body.description,
                last_date:req.body.last_date,
                tech_stack:req.body.tech_stack,
                organizer:req.body.organizer,
                min_team_size:req.body.min_team_size,
                max_team_size:req.body.max_team_size
            });
            newHackathon.save(function(err,user){
                if(err){
                    next(new Error("Database error! Try Again"));
                }
                else{
                    console.log("hackathon saved");    
                    res.redirect("/hackathon/hackathon-list");
                }
            });
        }
    });
module.exports = hackathonRouter;