const express = require('express');
const lotebodegaController = require('../../controller/configuracion/lotebodegaController.js');
const router = express.Router();

router.get('/', lotebodegaController.getAllMio);
router.get('/', lotebodegaController.getAll);
router.post('/edit', lotebodegaController.getOne); 
router.post('/', lotebodegaController.addNewData);
router.put('/', lotebodegaController.updateData);
router.delete('/', lotebodegaController.deleteData);
module.exports = router;