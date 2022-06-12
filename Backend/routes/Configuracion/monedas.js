const express = require('express');
const monedasController = require('../../controller/configuracion/monedasController.js');
const router = express.Router();

router.get('/', monedasController.getAll);
router.post('/edit', monedasController.getOne);
router.post('/', monedasController.addNewData);
router.put('/', monedasController.updateData);
router.delete('/', monedasController.deleteData);
module.exports = router;