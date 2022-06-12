const express = require('express');
const productosRController = require('../../controller/configuracion/productosController.js');
const router = express.Router();

router.get('/', productosRController.getAll);
router.post('/edit', productosRController.getOne);
 router.post('/', productosRController.addNewData);
 router.put('/', productosRController.updateData);
router.delete('/', productosRController.deleteData);

module.exports = router;