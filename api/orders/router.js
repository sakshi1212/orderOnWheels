const express = require('express');
const controller = require('./controller');

const router = express.Router();

// Get
router.post('/', controller.getCartItems);
router.post('/checkout', controller.checkout);

module.exports = router;
