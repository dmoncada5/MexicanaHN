const express = require('express');
const listapreciosController = require('../../controller/configuracion/listapreciosController.js');
const router = express.Router();

router.get('/', listapreciosController.getAll);
router.post('/edit', listapreciosController.getOne);
router.post('/productsPrice', listapreciosController.getOneProductsPrices);
router.post('/ActualizarPrecio', listapreciosController.ActualizarPrecio);
router.post('/', listapreciosController.addNewData);
router.put('/', listapreciosController.updateData);
router.delete('/', listapreciosController.deleteData);
module.exports = router;