const express = require('express');
const preciosController = require('../../controller/configuracion/preciosController.js');
const router = express.Router();

router.get('/', preciosController.getAll);
router.post('/edit', preciosController.getOne);
router.post('/', preciosController.addNewData);
router.put('/', preciosController.updateData);
router.delete('/', preciosController.deleteData);
module.exports = router;