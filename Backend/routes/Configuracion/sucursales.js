const express = require('express');
const sucursalesRController = require('../../controller/configuracion/sucursalesController.js');
const router = express.Router();

router.get('/', sucursalesRController.getAll);
router.post('/edit', sucursalesRController.getOne);
 router.post('/', sucursalesRController.addNewData);
 router.put('/', sucursalesRController.updateData);
router.delete('/', sucursalesRController.deleteData);

module.exports = router;