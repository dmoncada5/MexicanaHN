const express = require('express');
const tipousuariosRController = require('../../controller/configuracion/tipousuariosController.js');
const router = express.Router();

router.get('/', tipousuariosRController.getAll);
router.get('/permisos', tipousuariosRController.getPermisos);
router.post('/permisosU', tipousuariosRController.getPermisosU);
router.post('/actualizarpermiso', tipousuariosRController.ActualizarPermiso);
router.post('/edit', tipousuariosRController.getOne);
router.post('/', tipousuariosRController.addNewData);
router.put('/', tipousuariosRController.updateData);
router.delete('/', tipousuariosRController.deleteData);

module.exports = router;