const express = require('express');
const historialController = require('../../controller/configuracion/historialController.js');
const router = express.Router();

//router.get('/', historialController.getAllMio);
router.get('/', historialController.getAll);
router.post('/edit', historialController.getOne);
router.post('/', historialController.addNewData);
router.put('/', historialController.updateData);
router.delete('/', historialController.deleteData);
module.exports = router;