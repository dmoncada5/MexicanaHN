import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotaCreditosPComponent  } from './notacreditosp.component';
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
import {NotaCreditosPService} from '../notacreditosp/notacreditosp.service'
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { NotaCreditoPComponent } from '../notacreditop/notacreditop.component';
import {GuardallGuard} from '../../autenticar/guardall.guard'
import { BuscarPService } from '../buscar-ncp/buscar-p.service';


const routes = [
  {
      path     : 'ventas/notacreditosp',
      component: NotaCreditosPComponent,
      canActivate: [GuardallGuard],
      resolve  : {
        data: NotaCreditosPService,
        data2:BuscarPService
        
    }
   },
  {
      path     : 'notacreditosp/:id/:tipo',
      component: NotaCreditoPComponent,

  }
  // 'product/:id/:color/:category/:size
 ];


 // tslint:disable-next-line: align
 @NgModule({
  declarations: [NotaCreditosPComponent],
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
    NotaCreditosPComponent
  ],  
  providers   : [
 
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    NotaCreditosPService,
  ]
  
})
export class NotaCreditosPModule { }
 