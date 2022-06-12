const express = require('express');
const RfinanzasController = require('../../controller/Reportes/RfinanzasController.js');
const router = express.Router();

router.get('/SaldoCliente/:SocioCode', RfinanzasController.SaldoClientes);
router.post('/SaldoCliente', RfinanzasController.SaldoClientes);
router.post('/pagosRecibidos', RfinanzasController.pagosRecibidos);
router.post('/FacturaXTarjeta', RfinanzasController.FacturaXTarjeta);
router.post('/gastos', RfinanzasController.gastos);
router.post('/articulosVendidos', RfinanzasController.articulosVendidos);

module.exports = router;