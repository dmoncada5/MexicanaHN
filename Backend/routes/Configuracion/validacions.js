const express = require('express');
const validacionesController = require('../../controller/configuracion/validacionesController.js');
const router = express.Router();

router.get('/', validacionesController.getAll);
router.put('/', validacionesController.updateData);

module.exports = router;