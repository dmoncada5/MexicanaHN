const express = require('express');
const consultaexistenciaController = require('../../controller/ventas/consultaexistenciaController.js');
const router = express.Router();

router.get('/pedidos', consultaexistenciaController.getAllPCE);

module.exports = router;