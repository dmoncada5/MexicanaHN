import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseWidgetModule } from '@fuse/components';
import {NumeracionesComponent} from './numeraciones.component'
import { NumeracionComponent } from '../numeracion/numeracion.component';
import {NumeracionesService} from '../numeraciones/numeraciones.service';
import { RouterModule } from '@angular/router';
import {GuardallGuard} from '../../../main/autenticar/guardall.guard'

const routes = [
  {
      path     : 'configuracion/numeraciones',
      component: NumeracionesComponent ,
      canActivate: [GuardallGuard],
      resolve  : {
        data: NumeracionesService
    }
  },
  {
      path     : 'numeraciones/:id',
      component: NumeracionComponent,

  },
 ];

@NgModule({
  declarations: [NumeracionesComponent],
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
  ] , 
   exports     : [
    NumeracionesComponent
] ,
providers   : [
  NumeracionesService
]
})
export class NumeracionesModule { }
