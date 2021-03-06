const express = require('express');
const pcompraController = require('../../controller/ventas/pcompraController.js');
const router = express.Router();

router.get('/compras', pcompraController.getAllP);
//router.get('/', pedidoController.getAll);
router.post('/todo', pcompraController.getAll);
router.post('/correlativo', pcompraController.getNumero);
router.post('/correlativoOne', pcompraController.getOneNumero);
router.post('/formato', pcompraController.formato);
router.post('/Encabezado', pcompraController.getOneEncabezado);
router.post('/EncabezadoB', pcompraController.getOneEncabezadoBuscar);
router.post('/Detalle', pcompraController.getOneDetalle);
router.post('/postearEncabezado', pcompraController.addNewDataEncabezado);
router.post('/postearDetalle', pcompraController.addNewDataDetalle);
router.put('/Encabezado', pcompraController.updateDataeEncabezado);
router.put('/Detalle', pcompraController.updateDataDetalle);
router.put('/statusC', pcompraController.upStatus);
router.delete('/Encabezado', pcompraController.deleteDataEncabezado);
router.delete('/:DocNum', pcompraController.deleteDataDetalle);
module.exports = router;