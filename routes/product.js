const express = require('express');
const router = express.Router();

const ProductController = require('../controller/product');

router.get('/', ProductController.getProductAll);

router.get('/:id', ProductController.getSingleProduct);

//Post Method
router.post('/',   ProductController.newProducts)

router.put('/:id',  ProductController.updateProducts );

router.delete('/:id', ProductController.deleteProducts);

// getProductAll, getSingleProduct,updateProducts,deleteProducts,newProducts


module.exports = router;