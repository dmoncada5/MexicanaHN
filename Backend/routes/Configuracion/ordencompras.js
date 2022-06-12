const express = require('express');
const ordencomprasRController = require('../../controller/configuracion/ordencomprasController.js');
const router = express.Router();

router.get('/', ordencomprasRController.getAll);
router.post('/edit', ordencomprasRController.getOne);
 router.post('/', ordencomprasRController.addNewData);
 router.put('/', ordencomprasRController.updateData);
router.delete('/', ordencomprasRController.deleteData);

module.exports = router;