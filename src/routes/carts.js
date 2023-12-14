const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.get('/:cid', cartsController.getCartById);
router.post('/', cartsController.createCart);
router.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = router;
