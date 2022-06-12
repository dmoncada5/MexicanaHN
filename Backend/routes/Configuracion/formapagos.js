const express = require('express');
const formapagosRController = require('../../controller/configuracion/formapagosController.js');
const router = express.Router();

router.get('/', formapagosRController.getAll);
router.post('/edit', formapagosRController.getOne);
router.post('/', formapagosRController.addNewData);
router.put('/', formapagosRController.updateData);
router.delete('/', formapagosRController.deleteData);

module.exports = router;