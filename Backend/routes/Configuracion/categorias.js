const express = require('express');
const CategoriasController = require('../../controller/configuracion/categoriaController.js');
const router = express.Router();

router.get('/', CategoriasController.getAll);
router.post('/edit', CategoriasController.getOne);
router.post('/', CategoriasController.addNewData);
router.put('/', CategoriasController.updateData);
router.delete('/', CategoriasController.deleteData);
module.exports = router;