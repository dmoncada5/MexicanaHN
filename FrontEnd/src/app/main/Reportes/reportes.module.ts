import { NgModule } from '@angular/core';
import {SaldoClienteModule} from './Finanzas/saldo-cliente/saldo-cliente.module';
import {EstadiscoItemsModule} from './Finanzas/estadisco-items/estadisco-items.module';
import {DatosSociosModule} from './Socios/datos-socios/datos-socios.module';

import {PagosRecibidosModule} from './Finanzas/pagos-recibidos/pagos-recibidos.module'
import {ReportesService} from '../Reportes/reportes.service';
import { EstadiscoItemsComponent } from './Finanzas/estadisco-items/estadisco-items.component';
import { DatosSociosComponent } from './Socios/datos-socios/datos-socios.component';
import { FacturasXTarjetasModule } from './Finanzas/facturas-xtarjetas/facturas-xtarjetas.module';
import { reporteFacturasModule } from './Finanzas/reporteFacturas/reporteFacturas.module';
import { GastosModule } from '../Reportes/Finanzas/gastos/gastos.module';
import {CierreModule} from '../Reportes/Finanzas/cierre/cierre.module'

@NgModule({
  imports: [
SaldoClienteModule,
PagosRecibidosModule,
EstadiscoItemsModule,
DatosSociosModule,
FacturasXTarjetasModule,
GastosModule,
reporteFacturasModule,
CierreModule
],
providers   : [
ReportesService
],
entryComponents: [

] ,
declarations: [
]

})
export class ReportesModule { }
