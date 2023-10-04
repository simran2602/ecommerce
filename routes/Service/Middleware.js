//user object creation 
var user = {}

var userController = require('../../Controller/Auth/user');
var adminController = require('../../Controller/Auth/admin')
var responseCode = require('../../routes/Service/Response');

const permission = [
    {
        url: "/user/register"
    },
    {
        url: "/user/login"
    },
    {
        url:"/admin/register"
    },
    
]

user.middleware = async (req,res,next) => {   
    if (permission.filter(item => item.url == req.url).length > 0) {
        next();
    } else {
        if (!req.headers.authorization) {
            return res.status(responseCode.errorCode.requiredError).json({ error: "no credentials send", status: false, credentials: false })
        } else {
            let authorization = req.headers.authorization
            // console.log("userData",authorization)
            
            let userData = null
            let userType = typeof (req.headers.usertype) != "undefined" ? req.headers.usertype :"user"
            if(userType == "admin"){
                userData = await adminController.getTokenData(authorization)
            }else if(userType == "user"){
                userData = await userController.getTokenData(authorization)
                // console.log("userData",userData)
            }
            if(userData && userData != null){
                userData.password = null;
                userData.token = null;
                req.user = userData;
                req.userType = userType;
                req.token = req.headers.authorization,
                next();
            }else{
               return  res.status(responseCode.errorCode.authError).json({ error: "credentials not match", status: false, credentials: false });
            }
        }
    }

}

module.exports = user



