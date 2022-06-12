const express = require('express');
const departamentosController = require('../../controller/configuracion/departamentosController.js');
const router = express.Router();

router.get('/', departamentosController.getAll);
router.post('/edit', departamentosController.getOne);
router.post('/', departamentosController.addNewData);
router.put('/', departamentosController.updateData);
router.delete('/', departamentosController.deleteData);
module.exports = router;