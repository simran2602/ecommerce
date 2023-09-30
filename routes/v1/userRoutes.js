var express = require('express');
var router = express.Router();
var user = require('../../Controller/Auth/user');
const {getProd,searchProd,getProdByCat,getProdBySubCat}=require('../../Controller/user/product');
const { addToCart ,getCart,updateCart,deleteCart} =require('../../Controller/user/cart');
const {addtoBuy,getBuyNow}=require('../../Controller/user/buyNow');
const { addToOrderProduct,viewOrderProduct}=require('../../Controller/user/orderProduct');
const { addToOrderDetail}=require('../../Controller/user/orderDetails');

//product
router.get('/get-Prod',getProd);
router.get('/search-prod',searchProd);
router.get('/get-prod-by-cat',getProdByCat);
router.get('/get-prod-by-subcat',getProdBySubCat);
//cart
router.post('/add-to-cart',addToCart);
router.get('/get-cart/:id',getCart);
router.put('/update-cart/:id',updateCart);
router.delete('/delete-cart/:id',deleteCart);
//buynow
router.post('/add-to-buynow',addtoBuy);
router.get('/get-buynow',getBuyNow);
//orderProduct
router.post('/add-to-orderproduct',addToOrderProduct);
router.get('/get-orderproduct',viewOrderProduct);
//orderDetails
router.post('/add-to-orderdetails',addToOrderDetail);











module.exports = router;