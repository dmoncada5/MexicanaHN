const express = require('express');
const stocktransferController = require('../../controller/ventas/stocktransferController.js');
const router = express.Router();

//router.get('/stocktransfer', stocktransferController.getAll);
//router.get('/', compraController.getAll);
router.post('/todo', stocktransferController.getAll);
router.post('/correlativo', stocktransferController.getNumero);
router.post('/correlativoOne', stocktransferController.getOneNumero);
router.post('/formato', stocktransferController.formato);
router.post('/Encabezado', stocktransferController.getOneEncabezado);
router.post('/EncabezadoB', stocktransferController.getOneEncabezadoBuscar);
router.post('/Detalle', stocktransferController.getOneDetalle);
router.post('/postearEncabezado', stocktransferController.addNewDataEncabezado);
router.post('/postearDetalle', stocktransferController.addNewDataDetalle);
router.put('/Encabezado', stocktransferController.updateDataeEncabezado);
router.put('/Detalle', stocktransferController.updateDataDetalle);
router.put('/statusP', stocktransferController.upStatus);
router.delete('/Encabezado', stocktransferController.deleteDataEncabezado);
router.delete('/:DocNum', stocktransferController.deleteDataDetalle);
router.put('/statusC', stocktransferController.upStatus); // lo que agrege Javier
router.get('/widgetFactura', stocktransferController.widgetFactura);
router.get('/widbanner', stocktransferController.widbanner);
router.get('/widTop10', stocktransferController.widTop10);

module.exports = router;