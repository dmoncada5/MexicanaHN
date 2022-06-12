const express = require('express');
const SocioRController = require('../../controller/socio-negocio/socionegocioController.js');
const router = express.Router();

router.get('/', SocioRController.getAll);
router.get('/clientes', SocioRController.getDataClientes);
router.get('/proveedores', SocioRController.getDataProveedores);
router.post('/edit', SocioRController.getOne);
router.post('/', SocioRController.addNewData);
router.put('/', SocioRController.updateData);
router.post('/delete', SocioRController.deleteData);
module.exports = router;