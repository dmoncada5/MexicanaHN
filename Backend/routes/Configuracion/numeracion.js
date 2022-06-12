const express = require('express');
const paisesRController = require('../../controller/configuracion/numeracionController.js');
const router = express.Router();

router.post('/todo', paisesRController.getAll);
router.post('/updateC', paisesRController.updateCorrelativo);
router.post('/edit', paisesRController.getOne);
router.post('/', paisesRController.addNewData);
router.put('/', paisesRController.updateData);
router.delete('/', paisesRController.deleteData);
module.exports = router;