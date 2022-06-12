import { PrintcompraModule } from './printcompra/printcompra.module';

import { PrintPedidoModule } from './printpedido/printpedido.module';
import { PedidosService } from './pedidos/pedidos.service';
import { PromosService } from './promos/promos.service';
import { NgModule } from '@angular/core';
import {facturaModule} from 'app/main/ventas/factura/factura.module';
import {CotizacionesModule} from 'app/main/ventas/cotizaciones/cotizaciones.module';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import {CotizacionModule} from '../ventas/cotizacion/cotizacion.module';
import { CotizacionesService } from './cotizaciones/cotizaciones.service';
import {PrintCotizacionModule} from './print-cotizacion/print-cotizacion.module';
import { FacturasComponent } from './facturas/facturas.component';
import { PrintfacturaComponent } from './printfactura/printfactura.component';
import {PrintfacturaModule} from './printfactura/printfactura.module'
import {FacturasModule} from 'app/main/ventas/facturas/facturas.module';
import { FacturasService } from './facturas/facturas.service';
import { PedidosModule } from 'app/main/ventas/pedidos/pedidos.module';
import { PromosModule } from 'app/main/ventas/promos/promos.module';
import { CompraComponent } from './compra/compra.component';
import { ComprasComponent } from './compras/compras.component';
import { EntregasService } from './entregas/entregas.service';
import { ComprasService } from './compras/compras.service';
import { CompraModule } from './compra/compra.module';
import { ComprasModule } from 'app/main/ventas/compras/compras.module';
import { EntregaModule } from './entrega/entrega.module';
import { EntregasModule } from './entregas/entregas.module';
import { PedidoModule } from './pedido/pedido.module';
import { PromoModule } from './promo/promo.module';
import { BuscarPedidoComponent } from './buscar-pedido/buscar-pedido.component';
import {BuscarPedidoModule} from './buscar-pedido/buscar-pedido.module'
import {BuscarcotizacionModule} from './buscarcotizacion/buscarcotizacion.module'
import { BuscarCotizacionModule } from './buscar-cotizacion/buscar-cotizacion.module'
import { BuscarEntregaModule } from './buscar-entrega/buscar-entrega.module';

import {  BuscarFacturaModule } from './buscar-factura/buscar-factura.module';
import { BuscarCService } from './buscarcotizacion/buscar-c.service';
import {NotaCreditosModule} from 'app/main/ventas/notacreditos/notacreditos.module';
import { NotaCreditoModule } from 'app/main/ventas/notacredito/notacredito.module';
import { NotaCreditosService } from './notacreditos/notacreditos.service';
import { PrintnotacreditoComponent } from './printnotacredito/printnotacredito.component';
import {PrintnotacreditoModule} from './printnotacredito/printnotacredito.module';


import {BuscarPService} from './buscar-pedido/buscar-p.service'
import { BuscarFService } from './buscar-factura/buscar-f.service';
import { BuscarEntregaService } from './buscar-entrega/buscar-entrega.service';

import { BuscarNCPComponent } from './buscar-ncp/buscar-ncp.component';

import {NotaCreditosPModule} from './notacreditosp/notacreditosp.module';
import {NotaCreditoPModule} from './notacreditop/notacreditop.module';
import {NotaCreditosPService} from './notacreditosp/notacreditosp.service';
import {PrintnotacreditopModule} from './printnotacreditop/printnotacreditop.module' 
import {BuscarNCPModule} from './buscar-ncp/buscar-ncp.module';
import { BuscarEntregaComponent } from './buscar-entrega/buscar-entrega.component'
import { BuscarFacturaComponent } from './buscar-factura/buscar-factura.component';

// import { ConsultaExistenciaModule} from './consulta-existencia/consulta-existencia.module'
// import { ConsultaExistenciaService } from './consulta-existencia/consulta-esistencia.service';
// import { ConsultaexistenciaComponent } from './consultaexistencia/consultaexistencia.component';

import { ConsultaExistenciaModule} from './consultaexistencia/consultaexistencia.module'
import { ConsultaExistenciaService } from './consultaexistencia/consultaexistencia.service';

// Entradas de Mercaderia 
import { EntradasModule } from './entradas/entradas.module';
import { EntradaModule } from './entrada/entrada.module';
import { EntradasService } from './entradas/entradas.service';


// Salidas de Mercaderia 
import { SalidasModule } from './salidas/salidas.module';
import { SalidaModule } from './salida/salida.module';
import { SalidasService } from './salidas/salidas.service';

// ordenes de compra 
import { PComprasModule } from './pcompras/pcompras.module';
import { PCompraModule } from './pcompra/pcompra.module';
import { PComprasService } from './pcompras/pcompras.service';




import { PrintpcompraModule } from './printpcompra/printpcompra.module';
import { BuscarOrdenModule} from './buscar-orden/buscar-orden.module';
import { BuscarOService } from './buscar-orden/buscar-o.service';
import { StockTransfersModule } from './stocktransfers/stocktransfers.module';
import { StockTransferModule } from './stocktransfer/stocktransfer.module';
import { StockTransfersService } from './stocktransfers/stocktransfers.service';


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
        PrintfacturaModule,
        PrintcompraModule,
        PrintnotacreditoModule,
        PrintnotacreditopModule,
        PrintpcompraModule,
        EntregasModule,
        EntregaModule,
        StockTransfersModule,
        StockTransferModule,
        BuscarPedidoModule,
        BuscarcotizacionModule,
       // PrintpedidoModule,
       BuscarCotizacionModule,
       BuscarCotizacionModule,
       BuscarNCPModule,
     BuscarEntregaModule,
     BuscarFacturaModule,
       BuscarOrdenModule,
       ConsultaExistenciaModule
       
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
StockTransfersService,
BuscarPService,
BuscarCService,
BuscarFService,
BuscarEntregaService,
BuscarOService,
ConsultaExistenciaService,

  ],
  entryComponents: [
 
  ] ,
    declarations: [

]


})
// tslint:disable-next-line: class-name
export class ventasModule{}
