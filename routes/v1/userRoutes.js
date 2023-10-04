var express = require('express');
var router = express.Router();
var user = require('../../Controller/Auth/user');
var middleware = require('../../routes/Service/Middleware').middleware;
const { getProd, searchProd, getProdByCat, getProdBySubCat } = require('../../Controller/user/product');
const { addToCart, getCart, updateCart, deleteCart } = require('../../Controller/user/cart');
const { addtoBuy, getBuyNow } = require('../../Controller/user/buyNow');
// const { addToOrdProd} = require('../../Controller/user/orderProduct');
const { checkOut } = require('../../Controller/user/orderDetails');
const {addToWishlist}=require('../../Controller/user/wishlist');

//product
router.get('/get-Prod', getProd);
router.get('/search-prod', searchProd);
router.get('/get-prod-by-cat', getProdByCat);
router.get('/get-prod-by-subcat', getProdBySubCat);
//cart
router.post('/add-to-cart', addToCart);
router.get('/get-cart/:id', getCart);
router.put('/update-cart/:id', updateCart);
router.delete('/delete-cart/:id', deleteCart);
//buynow
router.post('/add-to-buynow', addtoBuy);
router.get('/get-buynow', getBuyNow);
//calling our middleware
router.use(middleware)

//orderProduct
// router.post('/addToOrdProd', addToOrdProd);
// router.get('/get-orderproduct', viewOrder);
// router.put('/update-orderproduct/:id', updateOrder);

//orderDetails
router.post('/checkOut',checkOut);

//wishlist
router.post("/add-to-wishlist",addToWishlist);











module.exports = router;