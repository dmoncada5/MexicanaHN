const express = require('express');
const usuariosRController = require('../../controller/configuracion/usuariosController.js');
const router = express.Router();

router.get('/', usuariosRController.getAll);
router.post('/edit', usuariosRController.getOne);
 router.post('/', usuariosRController.addNewData);
 router.put('/', usuariosRController.updateData);
router.delete('/', usuariosRController.deleteData);

module.exports = router;