var express = require('express');
var router = express.Router();
var user = require('../../Controller/Auth/user');
const {getProd}=require('../../Controller/user/product');
const { addToCart ,getCart,updateCart,deleteCart} =require('../../Controller/user/cart');

//product
router.get('/getProd',getProd);
//cart
router.post('/add-to-cart',addToCart);
router.get('/get-cart/:id',getCart);
router.put('update-cart/:id',updateCart);
router.delete('delete-cart/:id',updateCart);






module.exports = router;