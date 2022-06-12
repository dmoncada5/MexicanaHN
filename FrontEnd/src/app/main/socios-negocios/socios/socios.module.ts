import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SociosComponent } from './socios.component'
import { SocioComponent } from '../socio/socio.component';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseWidgetModule, FuseConfirmDialogModule, FuseSidebarModule } from '../../../../@fuse/components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {GuardallGuard} from '../../../main/autenticar/guardall.guard'

const routes = [
  {
      path     : 'socios-negocios/socios',
      component: SociosComponent ,
      canActivate: [GuardallGuard],
    //   resolve  : {
    //     data: NumeracionesService
    // }
  },
  {
      path     : 'socios/:id',
      component: SocioComponent,
      canActivate: [GuardallGuard],
     
  },
 ];




@NgModule({
  declarations: [SociosComponent],
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
    FuseWidgetModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
 
  ]
  , 
   exports     : [
    SociosComponent
] ,
providers   : [

]
})
export class SociosModule { }
