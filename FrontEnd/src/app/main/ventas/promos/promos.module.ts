import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PromosComponent  } from './promos.component';
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
import {PromosService} from './promos.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { PromoComponent } from '../promo/promo.component';
import {GuardallGuard} from '../../autenticar/guardall.guard';
import { BuscarCService } from '../buscar-cotizacion/buscar-c.service';


const routes = [
  {
      path     : 'ventas/promos',
      component: PromosComponent,
      canActivate: [GuardallGuard],
      resolve  : {
        data: PromosService,
        data1: BuscarCService
        
    }
   },
  {
      path     : 'promos/:id/:tipo',
      component: PromoComponent,

  }
 ];


 // tslint:disable-next-line: align
 @NgModule({
  declarations: [PromosComponent],
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
      PromosComponent
  ],  
  providers   : [
 
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    PromosService,
  ]
  
})
export class PromosModule { }
 