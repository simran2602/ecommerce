var express = require('express');
var router = express.Router();
var middleware = require('../../routes/Service/Middleware').middleware;
var {adminRegister,adminLogin} = require('../../Controller/Auth/admin')
var {userRegister,userLogin} = require('../../Controller/Auth/user')
var multer = require('multer');

// const uploadImg = multer({
//     storage:multer.diskStorage({
//         destination:function(req,file,cb){
//             return cb(null,"uploads")
//         },
//         filename:function(req,file,cb){
//             return cb(null,file.fieldname+"-"+Date.now()+".jpg")
//         }
//     })
// }).single("image")

//importing adminRoute.js 
var adminRoute = require('../../routes/v1/adminRoutes')
//importing userRoute.js
var userRoute = require('../../routes/v1/userRoutes');

//auth for admin
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

//auth for user
router.post('/user/register', userRegister);
router.post('/user/login', userLogin);


router.use('/admin', adminRoute);
router.use('/user',userRoute);

module.exports = router;
