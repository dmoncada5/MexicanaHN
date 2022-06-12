const express = require('express');
const pagosController = require('../../controller/pagos/pagosController.js');
const router = express.Router();

router.get('/numpago', pagosController.getNumPago);
router.post('/Bpago', pagosController.Bpago);
router.post('/pago', pagosController.postPago);
router.delete('/deletepago/:pagoId', pagosController.EliminarPago);
router.post('/efectivo', pagosController.postEfectivo);
router.post('/tarjeta', pagosController.postTarjeta);
router.post('/cheque', pagosController.postCheque);
router.post('/transferencia', pagosController.postTransferencia);

module.exports = router;