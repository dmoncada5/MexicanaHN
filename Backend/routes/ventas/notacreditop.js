const express = require('express');
const notacreditopController = require('../../controller/ventas/notacreditopController.js');
const router = express.Router();

router.get('/ncreditos', notacreditopController.getAllNC);
router.post('/todo', notacreditopController.getAll);
router.post('/correlativo', notacreditopController.getNumero);
router.post('/correlativoOne', notacreditopController.getOneNumero);
router.post('/formato', notacreditopController.formato);
router.post('/Encabezado', notacreditopController.getOneEncabezado);
router.post('/EncabezadoB', notacreditopController.getOneEncabezadoBuscar);
router.post('/Detalle', notacreditopController.getOneDetalle);
router.post('/postearEncabezado', notacreditopController.addNewDataEncabezado);
router.post('/postearDetalle', notacreditopController.addNewDataDetalle);
router.put('/Encabezado', notacreditopController.updateDataeEncabezado);
router.put('/Detalle', notacreditopController.updateDataDetalle);
router.delete('/Encabezado', notacreditopController.deleteDataEncabezado);
router.delete('/:DocNum', notacreditopController.deleteDataDetalle);
router.put('/statusC', notacreditopController.upStatus); // lo que agrege Javier
router.get('/widgetFactura', notacreditopController.widgetFactura);
router.get('/widbanner', notacreditopController.widbanner);
router.get('/widTop10', notacreditopController.widTop10);

module.exports = router;