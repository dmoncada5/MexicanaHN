const express = require('express');
const gruposController = require('../../controller/configuracion/gruposController.js');
const router = express.Router();

router.get('/', gruposController.getAll);
router.get('/gr', gruposController.getAll1);
router.post('/edit', gruposController.getOne);
router.post('/', gruposController.addNewData);
router.put('/', gruposController.updateData);
router.delete('/', gruposController.deleteData);
module.exports = router;