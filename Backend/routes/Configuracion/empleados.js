const express = require('express');
const empleadosController = require('../../controller/configuracion/empleadosController.js');
const router = express.Router();

router.get('/', empleadosController.getAllMio);
router.get('/todo', empleadosController.getAll);
router.post('/edit', empleadosController.getOne);
router.post('/', empleadosController.addNewData);
router.put('/', empleadosController.updateData);
router.delete('/', empleadosController.deleteData);
module.exports = router;