import { NgModule } from '@angular/core';
import {SaldoClienteModule} from './Finanzas/saldo-cliente/saldo-cliente.module';
import {EstadiscoItemsModule} from './Finanzas/estadisco-items/estadisco-items.module';
import {DatosSociosModule} from './Socios/datos-socios/datos-socios.module';

import {PagosRecibidosModule} from './Finanzas/pagos-recibidos/pagos-recibidos.module'
import {ReportesService} from '../Reportes/reportes.service';
import { EstadiscoItemsComponent } from './Finanzas/estadisco-items/estadisco-items.component';
import { DatosSociosComponent } from './Socios/datos-socios/datos-socios.component';
import { FacturasXTarjetasModule } from './Finanzas/facturas-xtarjetas/facturas-xtarjetas.module';
import { GastosComponent } from './Finanzas/gastos/gastos.component';
import { GastosModule } from '../Reportes/Finanzas/gastos/gastos.module'

@NgModule({
  imports: [
SaldoClienteModule,
PagosRecibidosModule,
EstadiscoItemsModule,
DatosSociosModule,
FacturasXTarjetasModule,
GastosModule
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
