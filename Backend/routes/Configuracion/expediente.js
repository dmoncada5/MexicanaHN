const express = require('express');
const expedienteController = require('../../controller/configuracion/expedienteController.js');
const router = express.Router();

//router.get('/', historialController.getAllMio);
router.get('/', expedienteController.getAll);
router.post('/edit', expedienteController.getOne);
router.post('/', expedienteController.addNewData);
router.put('/', expedienteController.updateData);
router.delete('/', expedienteController.deleteData);
module.exports = router;