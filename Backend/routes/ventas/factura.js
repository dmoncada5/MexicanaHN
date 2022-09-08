const express = require('express');
const facturaController = require('../../controller/ventas/facturaController.js');
const router = express.Router();

router.get('/facturas', facturaController.getAllF);
router.get('/entregas', facturaController.getAllE);
router.post('/todo', facturaController.getAll);
router.post('/correlativo', facturaController.getNumero);
router.post('/correlativoOne', facturaController.getOneNumero);
router.post('/formato', facturaController.formato);
router.post('/Encabezado', facturaController.getOneEncabezado);
router.post('/EncabezadoB', facturaController.getOneEncabezadoBuscar);
router.post('/Detalle', facturaController.getOneDetalle);
router.post('/postearEncabezado', facturaController.addNewDataEncabezado);
router.post('/postearDetalle', facturaController.addNewDataDetalle);
router.put('/Encabezado', facturaController.updateDataeEncabezado);
router.put('/Detalle', facturaController.updateDataDetalle);
router.put('/Letras', facturaController.updateCantLetras);
router.delete('/Encabezado', facturaController.deleteDataEncabezado);
router.delete('/:DocNum', facturaController.deleteDataDetalle);
router.put('/statusC', facturaController.upStatus); // lo que agrege Javier
router.get('/widgetFactura', facturaController.widgetFactura);
router.get('/widbanner', facturaController.widbanner);
router.get('/widTop10', facturaController.widTop10);
router.get('/alertas', facturaController.alertas);
router.get('/Columnasalertas', facturaController.Columnsalertas);

module.exports = router;