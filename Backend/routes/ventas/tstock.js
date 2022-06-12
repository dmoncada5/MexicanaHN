const express = require('express');
const tstockController = require('../../controller/ventas/tstockController.js');
const router = express.Router();

//router.get('/tstock', tstockController.getAll);
//router.get('/', compraController.getAll);
router.get('/todo', tstockController.getAllP);
router.post('/correlativo', tstockController.getNumero);
router.post('/correlativoOne', tstockController.getOneNumero);
router.post('/formato', tstockController.formato);
router.post('/Encabezado', tstockController.getOneEncabezado);
router.post('/EncabezadoB', tstockController.getOneEncabezadoBuscar);
router.post('/Detalle', tstockController.getOneDetalle);
router.post('/postearEncabezado', tstockController.addNewDataEncabezado);
router.post('/postearDetalle', tstockController.addNewDataDetalle);
router.put('/Encabezado', tstockController.updateDataeEncabezado);
router.put('/Detalle', tstockController.updateDataDetalle);
router.put('/statusP', tstockController.upStatus);
router.delete('/Encabezado', tstockController.deleteDataEncabezado);
router.delete('/:DocNum', tstockController.deleteDataDetalle);
router.put('/statusC', tstockController.upStatus); // lo que agrege Javier
router.get('/widgetFactura', tstockController.widgetFactura);
router.get('/widbanner', tstockController.widbanner);
router.get('/widTop10', tstockController.widTop10);

module.exports = router;