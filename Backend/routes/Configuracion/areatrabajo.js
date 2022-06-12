const express = require('express');
const areatrabajoController = require('../../controller/configuracion/areatrabajoController.js');
const router = express.Router();

router.get('/', areatrabajoController.getAll);
router.post('/edit', areatrabajoController.getOne);
router.post('/', areatrabajoController.addNewData);
router.put('/', areatrabajoController.updateData);
router.delete('/', areatrabajoController.deleteData);
module.exports = router;