// var express = require('express');
// var bodyParser = require("body-parser");
// const morgan = require('morgan');
// const cors = require('cors');
// const fs = require('fs')
// const path = require('path')

// const sql = require('mssql/msnodesqlv8')
// var app = express();




// // const config = {
// //     application: {
// //         cors: {
// //             server: [{
// //                 origin: "localhost:5000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
// //                 credentials: true
// //             }]
// //         }
// //     }
// // };
// // app.use(cors(
// //     config.application.cors.server
// // ));
// // const sql = require('mssql')

// app.use(express.urlencoded({ extended: false }));

// var bodyParser = require('./node_modules/body-parser');
// // create application/json parser
// app.use(bodyParser.json());

// app.use(morgan('dev'));
// var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

// // setup the logger
// app.use(morgan('combined', { stream: accessLogStream }))


// app.set('port', process.env.PORT || 5000);
// // app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'views'));

// // app.use(express.static(path.join(__dirname, 'public')));



// app.listen(app.get('port'), () => {
//     console.log("PUERTO 5000");
// });


// const config = {
//     user: 'sa',
//     password: 'albertom',
//     server: "localhost",
//     database: "poSystem",
//     driver: 'msnodesqlv8'

// }
// const poolPromise = new sql.ConnectionPool(config)
//     .connect()
//     .then(pool => {
//         console.log('Connected to MSSQL')

//         return pool
//     })
//     .catch(err => console.log('Database Connection Failed! Bad Config: ', err));


// const paisesRoutes = require('./routes/configuracion/paises');

// app.use('/api/paises', paisesRoutes);

// module.exports = {
//     sql,
//     poolPromise
// }


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

/*AUTENTICAR*/
const loginRoutes = require('./routes/autenticar/login');
/*CONFIGURACION*/
const paisesRoutes = require('./routes/configuracion/paises');
const numeracionRoutes = require('./routes/configuracion/numeracion');
const companyRoutes = require('./routes/configuracion/company');
const sucursalesRoutes = require('./routes/configuracion/sucursales');
const departamentosRoutes = require('./routes/configuracion/departamentos');
const municipiosRoutes = require('./routes/configuracion/municipios');
const areatrabajoRoutes = require('./routes/configuracion/areatrabajo');
const bodegasRoutes = require('./routes/configuracion/bodegas');
const lotebodegaRoutes = require('./routes/configuracion/lotebodega');
const monedasRoutes = require('./routes/configuracion/monedas');
const gastosRoutes = require('./routes/configuracion/gastos');
const cgastosRoutes = require('./routes/configuracion/cgastos');
const empleadosRoutes = require('./routes/configuracion/empleados');
const categoriaRoutes = require('./routes/configuracion/categorias');
const gruposRoutes = require('./routes/configuracion/grupos');
const usuariosRoutes = require('./routes/configuracion/usuarios');
const tipousuariosRoutes = require('./routes/configuracion/tipousuarios');
const formapagosRoutes = require('./routes/configuracion/formapagos');
const listapreciosRoutes = require('./routes/configuracion/listaprecios');
const preciosRoutes = require('./routes/configuracion/precios');
const historialRoutes = require('./routes/configuracion/historial');
const expedienteRoutes = require('./routes/configuracion/expediente');
const citaRoutes = require('./routes/configuracion/cita');

const productspriceRoutes = require('./routes/configuracion/productsprice');
const productosRoutes = require('./routes/configuracion/productos');
/*SOCIOS DE NEGOCIOS*/
const sociosRoutes = require('./routes/socio-negocio/socios');

/*INVENTARIO*/
const productsRoutes = require('./routes/Inventario/inventario');
const productsIRoutes = require('./routes/configuracion/products');

/*VENTAS */
const cotizacionRoutes = require('./routes/ventas/cotizacion');
const facturaRoutes = require('./routes/ventas/factura');
const pedidoRoutes = require('./routes/ventas/pedido');
const pcompraRoutes = require('./routes/ventas/pcompra');
const entradaRoutes = require('./routes/ventas/entrada');
const salidaRoutes = require('./routes/ventas/salida');
const compraRoutes = require('./routes/ventas/compra');
const tstockRoutes = require('./routes/ventas/tstock');

const promoRoutes = require('./routes/ventas/promo');
const consultaexistenciaRoutes = require('./routes/ventas/consultaexistencia');
/*pagos*/
const pagoRoutes = require('./routes/pagos/pago');
const notacreditoRoutes = require('./routes/ventas/notacredito');
const notacreditopRoutes = require('./routes/ventas/notacreditop');

/*Reportes */
const SaldoClientesRoutes = require('./routes/Reportes/ReportesFinanzas');
const SociosRRoutes = require('./routes/Reportes/ReportesSocios');



//HEAD
/*
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//var bodyParser = require('./node_modules/body-parser');
// parse application/json
app.use(bodyParser.json())
*/

app.use('/api/departamentos', departamentosRoutes);
app.use('/api/paises', paisesRoutes);

/* URL autenticar */
app.use('/api/login', loginRoutes);

/*URL CONFIGURACIONES */
app.use('/api/paises', paisesRoutes);
app.use('/api/numeracion', numeracionRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/sucursales', sucursalesRoutes);
//app.use('/api/departamentos', departamentosRoutes);

app.use('/api/municipios', municipiosRoutes);
app.use('/api/areatrabajo', areatrabajoRoutes);
app.use('/api/bodegas', bodegasRoutes);
app.use('/api/lotebodega', lotebodegaRoutes);
app.use('/api/monedas', monedasRoutes);
app.use('/api/gastos', gastosRoutes);
app.use('/api/cgastos', cgastosRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tipousuarios', tipousuariosRoutes);
app.use('/api/formapagos', formapagosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/listaprecios', listapreciosRoutes);
app.use('/api/precios', preciosRoutes);
app.use('/api/productsprice', productspriceRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/expediente', expedienteRoutes);
app.use('/api/cita', citaRoutes);
/*URL SOCIOS */
app.use('/api/socios', sociosRoutes);

/*URL INVENTARIO */
app.use('/api/products', productsRoutes);
app.use('/api/productsI', productsIRoutes);

/* URL VENTAS */
app.use('/api/cotizacion', cotizacionRoutes);
app.use('/api/factura', facturaRoutes);
app.use('/api/pedido', pedidoRoutes);
app.use('/api/pcompra', pcompraRoutes);
app.use('/api/salida', salidaRoutes);
app.use('/api/entrada', entradaRoutes);
app.use('/api/consultaexistencia', consultaexistenciaRoutes);
app.use('/api/compra', compraRoutes);
app.use('/api/promo', promoRoutes);
app.use('/api/tstock', tstockRoutes);


/*URL PAGO */
app.use('/api/pago', pagoRoutes);
app.use('/api/notacredito', notacreditoRoutes);
app.use('/api/notacreditop', notacreditopRoutes);


/*URL REPORTES */

app.use('/api/Rfinanzas', SaldoClientesRoutes);
app.use('/api/Rsocios', SociosRRoutes);

//const port = 5010
const port = 5000

app.listen(process.env.PORT || port, (err) => {
    if (err)
        console.log('Unable to start the server!')
    else
        console.log('Server started running on : ' + port)
})