var express = require('express');
var router = express.Router();
var admin = require('../../Controller/Auth/admin');
const { createCat, getCat, updateCat, deleteCat } = require('../../Controller/admin/category');
const { createSubCat, getSubCat, updateSubCat, deleteSubCat } = require('../../Controller/admin/subcat');
const { addProd, getProd, updateProd, deleteProd } = require('../../Controller/admin/product');
const { addItemDetails, getItemDetails, updateItemDetails, deleteItemDetails } = require('../../Controller/admin/itemdetails');


//category
router.post('/add-category', createCat);
router.get('/get-category', getCat);
router.put('/update-category', updateCat);
router.delete('/delete-category', deleteCat);
//subCatgory
router.post('/add-subcategory', createSubCat);
router.get('/get-subcategory', getSubCat);
router.put('/update-subcategory', updateSubCat);
router.delete('/delete-subcategory', deleteSubCat);
//product
router.post('/add-product', addProd);
router.get('/get-product', getProd);
router.put('/update-product/:id', updateProd);
router.delete('/delete-product/:id', deleteProd);
//itemDetails
router.post('/add-itemdetails', addItemDetails);
router.get('/get-itemdetails', getItemDetails);
router.put('/update-itemdetails/:id', updateItemDetails);
router.delete('/delete-itemdetails/:id', deleteItemDetails);









module.exports = router;






