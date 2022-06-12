const express = require('express');
const notacreditoController = require('../../controller/ventas/notacreditoController.js');
const router = express.Router();

router.get('/ncreditos', notacreditoController.getAllNC);
router.post('/todo', notacreditoController.getAll);
router.post('/correlativo', notacreditoController.getNumero);
router.post('/correlativoOne', notacreditoController.getOneNumero);
router.post('/formato', notacreditoController.formato);
router.post('/Encabezado', notacreditoController.getOneEncabezado);
router.post('/EncabezadoB', notacreditoController.getOneEncabezadoBuscar);
router.post('/Detalle', notacreditoController.getOneDetalle);
router.post('/postearEncabezado', notacreditoController.addNewDataEncabezado);
router.post('/postearDetalle', notacreditoController.addNewDataDetalle);
router.put('/Encabezado', notacreditoController.updateDataeEncabezado);
router.put('/Detalle', notacreditoController.updateDataDetalle);
router.delete('/Encabezado', notacreditoController.deleteDataEncabezado);
router.delete('/:DocNum', notacreditoController.deleteDataDetalle);
router.put('/statusC', notacreditoController.upStatus); // lo que agrege Javier
router.get('/widgetFactura', notacreditoController.widgetFactura);
router.get('/widbanner', notacreditoController.widbanner);
router.get('/widTop10', notacreditoController.widTop10);
module.exports = router;