var express = require('express');
var router = express.Router();
var user = require('../../Controller/Auth/user');
const {getProd,searchProd}=require('../../Controller/user/product');
const { addToCart ,getCart,updateCart,deleteCart} =require('../../Controller/user/cart');

//product
router.get('/get-Prod',getProd);
router.get('/search-prod',searchProd);

//cart
router.post('/add-to-cart',addToCart);
router.get('/get-cart/:id',getCart);
router.put('/update-cart/:id',updateCart);
router.delete('/delete-cart/:id',deleteCart);




module.exports = router;