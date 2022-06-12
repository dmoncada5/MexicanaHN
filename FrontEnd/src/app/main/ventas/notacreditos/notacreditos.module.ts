import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotaCreditosComponent  } from './notacreditos.component';
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
import {NotaCreditosService} from '../notacreditos/notacreditos.service'
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { NotaCreditoComponent } from '../notacredito/notacredito.component';
import {GuardallGuard} from '../../autenticar/guardall.guard'
import { BuscarFService } from '../buscar-factura/buscar-f.service';
import { BuscarEntregaService } from '../buscar-entrega/buscar-entrega.service';


const routes = [
  {
      path     : 'ventas/notacreditos',
      component: NotaCreditosComponent,
      canActivate: [GuardallGuard],
      resolve  : {
        data: NotaCreditosService,
        data2:BuscarFService,
        data3:BuscarEntregaService
        
    }
   },
  {
      path     : 'notacreditos/:id/:tipo',
      component: NotaCreditoComponent,

  }
  // 'product/:id/:color/:category/:size
 ];


 // tslint:disable-next-line: align
 @NgModule({
  declarations: [NotaCreditosComponent],
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
    NotaCreditosComponent
  ],  
  providers   : [
 
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    NotaCreditosService,
  ]
  
})
export class NotaCreditosModule { }
 