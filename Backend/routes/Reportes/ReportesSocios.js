const express = require('express');
const SociosRController = require('../../controller/Reportes/RSociosController.js');
const router = express.Router();

router.post('/sociosGrupo', SociosRController.SociosGrupo);
router.post('/sociosCategoria', SociosRController.SociosCategoria);

module.exports = router;