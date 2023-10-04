var express = require('express');
var router = express.Router();
var user = require('../../Controller/Auth/user');
var middleware = require('../../routes/Service/Middleware').middleware;
const { getProd, searchProd, getProdByCat, getProdBySubCat } = require('../../Controller/user/product');
const { addToCart, getCart, updateCart, deleteCart } = require('../../Controller/user/cart');
const { addtoBuy, getBuyNow } = require('../../Controller/user/buyNow');
// const { addToOrdProd} = require('../../Controller/user/orderProduct');
const { checkOut,getOrder } = require('../../Controller/user/orderDetails');
const {addToWishlist}=require('../../Controller/user/wishlist');



// calling our middleware
router.use(middleware)


//product
router.get('/get-Prod', getProd);
router.get('/search-prod', searchProd);
router.get('/get-prod-by-cat', getProdByCat);
router.get('/get-prod-by-subcat', getProdBySubCat);
//cart
router.post('/add-to-cart', addToCart);
router.get('/get-cart', getCart);
router.put('/update-cart', updateCart);
router.delete('/delete-cart', deleteCart);
//buynow
router.post('/add-to-buynow', addtoBuy);
router.get('/get-buynow', getBuyNow);
//orderProduct
// router.post('/addToOrdProd', addToOrdProd);
// router.get('/get-orderproduct', viewOrder);
// router.put('/update-orderproduct/:id', updateOrder);

//orderDetails
router.post('/checkOut',checkOut);
router.get('/get-order',getOrder);


//wishlist
router.post("/add-to-wishlist",addToWishlist);











module.exports = router;