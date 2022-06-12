const express = require('express');
const gastosController = require('../../controller/configuracion/gastosController.js');
const router = express.Router();

router.get('/', gastosController.getAll);
router.post('/edit', gastosController.getOne);
router.post('/', gastosController.addNewData);
router.put('/', gastosController.updateData);
router.delete('/', gastosController.deleteData);
module.exports = router;