const express = require('express');
const cgastosController = require('../../controller/configuracion/cgastosController.js');
const router = express.Router();

router.get('/', cgastosController.getAll);
router.post('/edit', cgastosController.getOne);
router.post('/', cgastosController.addNewData);
router.put('/', cgastosController.updateData);
router.delete('/', cgastosController.deleteData);
module.exports = router;