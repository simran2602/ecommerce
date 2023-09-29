var express = require('express');
var router = express.Router();
var {adminRegister,adminLogin} = require('../../Controller/Auth/admin')
var {userRegister,userLogin} = require('../../Controller/Auth/user')
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
