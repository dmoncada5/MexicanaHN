const express = require('express');
const usuariosRController = require('../../controller/autenticar/loginController.js');
const router = express.Router();

router.post('/', usuariosRController.getOne);
router.post('/permisos', usuariosRController.getpermisos);


module.exports = router;