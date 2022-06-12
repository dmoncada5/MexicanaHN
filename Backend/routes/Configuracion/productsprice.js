const express = require('express');
const productspriceController = require('../../controller/configuracion/productspriceController.js');
const router = express.Router();

router.get('/', productspriceController.getAll);
router.post('/edit', productspriceController.getOne);
router.post('/', productspriceController.addNewData);
router.put('/', productspriceController.updateData);
router.delete('/', productspriceController.deleteData);
module.exports = router;