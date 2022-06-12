const express = require('express');
const inventarioController = require('../../controller/inventario/inventarioController.js');
const router = express.Router();

router.get('/', inventarioController.getAll);
router.post('/edit', inventarioController.getOne);
router.post('/price', inventarioController.getPrice);
router.post('/info', inventarioController.getInfo);
router.post('/info2', inventarioController.getInfo2);
router.post('/infoComp', inventarioController.getInfoComp);
router.post('/Existencia', inventarioController.getExistencia);
router.post('/ExecExistencia', inventarioController.ExecExistencia);
router.post('/setExistencia', inventarioController.setExistencia);
router.post('/setComprometido', inventarioController.setComprometido);
router.post('/pedidoExistencia', inventarioController.pedidoExistencia);
router.post('/comprasExistencia', inventarioController.comprasExistencia);
router.post('/getNCExistencia', inventarioController.getNCExistencia);
router.post('/ordenExistencia', inventarioController.ordenExistencia);
module.exports = router;