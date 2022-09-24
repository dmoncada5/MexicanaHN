import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FacturasComponent  } from './facturas.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseWidgetModule } from '../../../../@fuse/components';
import {FacturasService} from '../facturas/facturas.service'
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { FacturaComponent } from '../factura/factura.component';
import {GuardallGuard} from '../../../main/autenticar/guardall.guard';
import { BuscarPService } from '../buscar-pedido/buscar-p.service';
import { BuscarCService } from '../buscarcotizacion/buscar-c.service';
const routes = [
  {
      path     : 'ventas/facturas',
      component: FacturasComponent,
      canActivate: [GuardallGuard],
      resolve  : {
        data: FacturasService,
        data1:BuscarPService,
        data2:BuscarCService
        
    }
   },
  {
      path     : 'facturas/:id/:tipo',
      component: FacturaComponent,
      canActivate: [GuardallGuard],

  }
  // 'product/:id/:color/:category/:size
 ];


 // tslint:disable-next-line: align
 @NgModule({
  declarations: [FacturasComponent],
  imports: [
    RouterModule.forChild(routes),
    MatSortModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule, 
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    NgxChartsModule,
    FuseSharedModule,
    FuseWidgetModule
  ],
  exports     : [
      FacturasComponent
  ],  
  providers   : [
 
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    FacturasService,
  ]
  
})
export class FacturasModule { }
 