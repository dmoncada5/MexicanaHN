const express = require('express');
const paisesRController = require('../../controller/configuracion/paisesController.js');
const router = express.Router();

router.get('/', paisesRController.getAll);
router.post('/edit', paisesRController.getOne);
router.post('/', paisesRController.addNewData);
router.put('/', paisesRController.updateData);
router.delete('/', paisesRController.deleteData);
module.exports = router;