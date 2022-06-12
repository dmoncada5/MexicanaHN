const express = require('express');
const compraController = require('../../controller/ventas/compraController.js');
const router = express.Router();

router.get('/compras', compraController.getAllP);
//router.get('/', compraController.getAll);
router.post('/todo', compraController.getAll);
router.post('/correlativo', compraController.getNumero);
router.post('/correlativoOne', compraController.getOneNumero);
router.post('/formato', compraController.formato);
router.post('/Encabezado', compraController.getOneEncabezado);
router.post('/EncabezadoB', compraController.getOneEncabezadoBuscar);
router.post('/Detalle', compraController.getOneDetalle);
router.post('/postearEncabezado', compraController.addNewDataEncabezado);
router.post('/postearDetalle', compraController.addNewDataDetalle);
router.put('/Encabezado', compraController.updateDataeEncabezado);
router.put('/Detalle', compraController.updateDataDetalle);
router.put('/statusP', compraController.upStatus);
router.delete('/Encabezado', compraController.deleteDataEncabezado);
router.delete('/:DocNum', compraController.deleteDataDetalle);
router.put('/statusC', compraController.upStatus); // lo que agrege Javier
router.get('/widgetFactura', compraController.widgetFactura);
router.get('/widbanner', compraController.widbanner);
router.get('/widTop10', compraController.widTop10);

module.exports = router;