const express = require('express');
const productsRController = require('../../controller/configuracion/productsController.js');
const router = express.Router();

router.get('/', productsRController.getAll);
router.post('/edit', productsRController.getOne);
router.post('/', productsRController.addNewData);
router.post('/existencia', productsRController.addNewDataExistencia);
router.put('/', productsRController.updateData);
router.delete('/', productsRController.deleteData);

module.exports = router;