const express = require('express');
const municipiosController = require('../../controller/configuracion/municipiosController.js');
const router = express.Router();

router.get('/', municipiosController.getAll);
router.post('/edit', municipiosController.getOne);
router.post('/', municipiosController.addNewData);
router.put('/', municipiosController.updateData);
router.delete('/', municipiosController.deleteData);
module.exports = router;