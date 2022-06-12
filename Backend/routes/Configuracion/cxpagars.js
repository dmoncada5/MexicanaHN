const express = require('express');
const cxpagarsRController = require('../../controller/configuracion/cxpagarsController.js');
const router = express.Router();

router.get('/', cxpagarsRController.getAll);
router.post('/edit', cxpagarsRController.getOne);
 router.post('/', cxpagarsRController.addNewData);
 router.put('/', cxpagarsRController.updateData);
router.delete('/', cxpagarsRController.deleteData);

module.exports = router;