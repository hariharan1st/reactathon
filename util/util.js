util = {
    checkSignIn : function(req,res,next){
        if(req.session.user == null){
            var err = new Error("User validation Failed");
            next(err);
        }
        else{
            next();
        }
    },
    popSessionValue : function(req,key){
        var temp = req.session[key];
        req.session[key] = null;
        return temp;
    }
};

module.exports = util;