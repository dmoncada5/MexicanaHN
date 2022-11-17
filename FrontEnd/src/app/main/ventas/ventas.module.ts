import { PrintcompraModule } from './printcompra/printcompra.module';

import { PedidosService } from './pedidos/pedidos.service';
import { PromosService } from './promos/promos.service';
import { NgModule } from '@angular/core';
import {facturaModule} from 'app/main/ventas/factura/factura.module';
import {CotizacionesModule} from 'app/main/ventas/cotizaciones/cotizaciones.module';
import {CotizacionModule} from '../ventas/cotizacion/cotizacion.module';
import { CotizacionesService } from './cotizaciones/cotizaciones.service';
import {PrintCotizacionModule} from './print-cotizacion/print-cotizacion.module';
import {PrintfacturaModule} from './printfactura/printfactura.module';
import {PrintEntradaModule} from './printentrada/printentrada.module';

import {PrintTrasladoModule} from './printtraslado/printtraslado.module';

import {FacturasModule} from 'app/main/ventas/facturas/facturas.module';
import { FacturasService } from './facturas/facturas.service';
import { PedidosModule } from 'app/main/ventas/pedidos/pedidos.module';
import { PromosModule } from 'app/main/ventas/promos/promos.module';
import { EntregasService } from './entregas/entregas.service';
import { ComprasService } from './compras/compras.service';
import { CompraModule } from './compra/compra.module';
import { ComprasModule } from 'app/main/ventas/compras/compras.module';

import { EntregaModule } from './entrega/entrega.module';
import { EntregasModule } from './entregas/entregas.module';
import {PrintentregaModule} from './printentrega/printentrega.module';

import { PedidoModule } from './pedido/pedido.module';
import { PromoModule } from './promo/promo.module';
import {BuscarPedidoModule} from './buscar-pedido/buscar-pedido.module'
import {BuscarcotizacionModule} from './buscarcotizacion/buscarcotizacion.module'
import { BuscarCotizacionModule } from './buscar-cotizacion/buscar-cotizacion.module'
import { BuscarEntregaModule } from './buscar-entrega/buscar-entrega.module';

import {  BuscarFacturaModule } from './buscar-factura/buscar-factura.module';
import { BuscarCService } from './buscarcotizacion/buscar-c.service';
import {NotaCreditosModule} from 'app/main/ventas/notacreditos/notacreditos.module';
import { NotaCreditoModule } from 'app/main/ventas/notacredito/notacredito.module';
import { NotaCreditosService } from './notacreditos/notacreditos.service';
import {PrintnotacreditoModule} from './printnotacredito/printnotacredito.module';


import {BuscarPService} from './buscar-pedido/buscar-p.service'
import { BuscarFService } from './buscar-factura/buscar-f.service';
import { BuscarEntregaService } from './buscar-entrega/buscar-entrega.service';


import {NotaCreditosPModule} from './notacreditosp/notacreditosp.module';
import {NotaCreditoPModule} from './notacreditop/notacreditop.module';
import {NotaCreditosPService} from './notacreditosp/notacreditosp.service';
import {PrintnotacreditopModule} from './printnotacreditop/printnotacreditop.module' 
import {BuscarNCPModule} from './buscar-ncp/buscar-ncp.module';

// import { ConsultaExistenciaModule} from './consulta-existencia/consulta-existencia.module'
// import { ConsultaExistenciaService } from './consulta-existencia/consulta-esistencia.service';
// import { ConsultaexistenciaComponent } from './consultaexistencia/consultaexistencia.component';

import { ConsultaExistenciaModule} from './consultaexistencia/consultaexistencia.module'
import { ConsultaExistenciaService } from './consultaexistencia/consultaexistencia.service';

// Entradas de Mercaderia 
import { EntradasModule } from './entradas/entradas.module';
import { EntradaModule } from './entrada/entrada.module';
import { EntradasService } from './entradas/entradas.service';

// solicitudes de Traslados  de Mercaderia 
import { SolicitudtsModule } from './solicitudts/solicitudts.module';
import { SolicitudtModule } from './solicitudt/solicitudt.module';
import { SolicitudtsService } from './solicitudts/solicitudts.service';


// Salidas de Mercaderia 
import { SalidasModule } from './salidas/salidas.module';
import { SalidaModule } from './salida/salida.module';
import { SalidasService } from './salidas/salidas.service';

// ordenes de compra 
import { PComprasModule } from './pcompras/pcompras.module';
import { PCompraModule } from './pcompra/pcompra.module';
import { PComprasService } from './pcompras/pcompras.service';


import { BuscarTrasladoModule} from './buscar-traslado/buscar-traslado.module';
import { BuscarTrasladoService } from './buscar-traslado/buscar-traslado.service';


import { PrintpcompraModule } from './printpcompra/printpcompra.module';
import { BuscarOrdenModule} from './buscar-orden/buscar-orden.module';
import { BuscarOService } from './buscar-orden/buscar-o.service';

import { StocktransfersModule } from './stocktransfers/stocktransfers.module';
import { StocktransferModule } from './stocktransfer/stocktransfer.module';

import {StocktransfersService} from './stocktransfers/stocktransfers.service';
import { PrintfacturaletterComponent } from './printfacturaletter/printfacturaletter.component'
import { PrintfacturaletterModule } from './printfacturaletter/printfacturaletter.module';

 @NgModule({
    imports: [
        CotizacionesModule,
        CotizacionModule,
        PrintCotizacionModule,
        NotaCreditosModule,
        NotaCreditoModule,
        NotaCreditosPModule,
        NotaCreditoPModule,
        FacturasModule,
        facturaModule,
        ComprasModule,
        CompraModule,
        PromosModule,
        PromoModule,
        PedidosModule,
        PedidoModule,
        PComprasModule,
        PCompraModule,
        SalidasModule,
        SalidaModule,
        EntradasModule,
        EntradaModule,
        SolicitudtsModule,
        SolicitudtModule,
        StocktransfersModule,
        StocktransferModule,
        ConsultaExistenciaModule,
        PrintfacturaModule,
        PrintcompraModule,
        PrintnotacreditoModule,
        PrintnotacreditopModule,
        PrintpcompraModule,
        PrintTrasladoModule,
        //PrintSolicitudTrasladoModule,
        EntregasModule,
        EntregaModule,
        PrintentregaModule,
        PrintEntradaModule,
        //PrintSalidaModule,
       // PrintPedidoModule,
        BuscarPedidoModule,
        BuscarcotizacionModule,
       // PrintpedidoModule,
       BuscarCotizacionModule,
       BuscarNCPModule,
       BuscarEntregaModule,
       BuscarFacturaModule,
       BuscarOrdenModule,
       BuscarTrasladoModule, 
       PrintfacturaletterModule  
       
    ],
    providers   : [
CotizacionesService,
FacturasService,
PedidosService,
PromosService,
ComprasService,
PComprasService,
EntregasService,
NotaCreditosService,
NotaCreditosPService,
SalidasService,
EntradasService,
SolicitudtsService,
StocktransfersService,
ConsultaExistenciaService,
BuscarPService,
BuscarCService,
BuscarFService,
BuscarEntregaService,
BuscarOService,
BuscarTrasladoService,


  ],
  entryComponents: [
 
  ] ,
    declarations: [

]


})
// tslint:disable-next-line: class-name
export class ventasModule{}
