var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var multer = require('multer');
var upload = multer();
var app = express();
var session = require("express-session");
var util = require("./util/util.js");
var loginRouter = require("./routes/login.js");
var hackathonRouter = require("./routes/hackathon.js");

app.set('view engine', 'pug');
app.set('views','./views');

var reqCount = 0;

app.use(express.static('static'));

app.use(function(req,res,next){
    reqCount++;
    req.param.reqid = reqCount;
    req.param.startTime = Date.now();
    next();
});
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 

app.use(cookieParser());
app.use(session({ secret:"secret test" }));

app.use("/login", loginRouter);
app.use("/hackathon", util.checkSignIn, hackathonRouter);

app.get("/", function(req,res, next){
    res.render("index.pug", {message:req.message});
    next();
});

app.use(function(err,req,res,next){
    res.render("index.pug", {message:err.message});
    console.log(err.stack);
    next();
});

app.use(function(req,res){
    console.log("A new request " + req.param.reqid + " ended. Time Taken : " + (Date.now()-req.param.startTime) + " ms");
    res.end();
});

app.listen(3000);   