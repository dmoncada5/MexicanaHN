const express = require('express');
const bodegasController = require('../../controller/configuracion/bodegasController.js');
const router = express.Router();

router.get('/', bodegasController.getAll);
router.post('/edit', bodegasController.getOne);
router.post('/bodega', bodegasController.getOneBodega);
router.post('/', bodegasController.addNewData);
router.post('/existencia', bodegasController.addNewDataExistencia);
router.put('/', bodegasController.updateData);
router.delete('/', bodegasController.deleteData);


module.exports = router;