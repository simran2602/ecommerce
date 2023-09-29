var express = require('express');
var router = express.Router();
var admin = require('../../Controller/Auth/admin');
var user = require('../../Controller/Auth/user');
//importing adminRoute.js 
var adminRoute = require('../../routes/v1/adminRoutes')
//importing userRoute.js
var userRoute = require('../../routes/v1/userRoutes');

//auth for admin
router.post('/admin/register', admin.adminRegister);
router.post('/admin/login', admin.adminLogin);

//auth for user
router.post('/user/register', user.userRegister);
router.post('/user/login', user.userLogin);


router.use('/admin', adminRoute);
router.use('/user',userRoute);

module.exports = router;
