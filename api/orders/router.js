const express = require('express');
const controller = require('./controller');

const router = express.Router();

// Get
router.get('/', controller.getCartItems);
router.get('/checkout', controller.checkout);

module.exports = router;
