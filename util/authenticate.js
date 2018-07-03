authenticationutil = {
    checkSignIn : function(req,res,next){
        if(req.session.user == null){
            var err = new Error("User validation Failed");
            next(err);
        }
        else{
            next();
        }
    }
};

module.exports = authenticationutil;