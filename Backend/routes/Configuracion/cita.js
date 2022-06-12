const express = require('express');
const citaController = require('../../controller/configuracion/citaController.js');
const router = express.Router();

//router.get('/', historialController.getAllMio);
router.get('/', citaController.getAllEx);
router.get('/V/:exp', citaController.getAll);

router.post('/Data', citaController.getAllDATA);
router.get('/numpago', citaController.getNumPago);
router.post('/edit', citaController.getOne);
router.post('/SelectProd', citaController.getOneproductocita);
router.post('/', citaController.addNewData);
router.put('/', citaController.updateData);
router.delete('/', citaController.deleteData);
router.post('/products', citaController.addNewProducts);
router.delete('/deleteproducts/:cita/:item', citaController.EliminarProducts);
module.exports = router;