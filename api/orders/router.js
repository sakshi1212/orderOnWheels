const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.patch('/:id', controller.update);

module.exports = router;
