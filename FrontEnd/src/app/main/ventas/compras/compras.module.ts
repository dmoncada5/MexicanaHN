import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasComponent  } from './compras.component';
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
import {ComprasService} from '../../ventas/compras/compras.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CompraComponent } from '../compra/compra.component';
import {GuardallGuard} from '../../../main/autenticar/guardall.guard'
import { BuscarOService } from '../buscar-orden/buscar-o.service';

 
const routes = [
  {
      path     : 'ventas/compras',
      component: ComprasComponent
      ,
      canActivate: [GuardallGuard],
      resolve  : {
        data: ComprasService,
        data1: BuscarOService
    }
   },
  {
      path     : 'compras/:id/:tipo',
      component: CompraComponent,

  }
 ];


 // tslint:disable-next-line: align
 @NgModule({
  declarations: [ComprasComponent],
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
      ComprasComponent
  ], 
  providers   : [
    ComprasService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ]
  
})

export class ComprasModule { }
