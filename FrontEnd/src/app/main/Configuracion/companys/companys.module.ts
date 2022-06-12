import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
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
import { FuseWidgetModule } from '../../../../@fuse/components';
import {CompanysComponent} from './companys.component'
import {CompanyComponent} from '../company/company.component'
import {NumeracionesService} from '../numeraciones/numeraciones.service';
import { RouterModule } from '@angular/router';
import { CompanysService } from './companys.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {GuardallGuard} from '../../../main/autenticar/guardall.guard'

const routes = [
  {
      path     : 'configuracion/companys',
      component: CompanysComponent
      ,
      canActivate: [GuardallGuard],
      resolve  : {
        data: CompanysService
    }
  },
  {
      path     : 'companys/:id',
      component: CompanyComponent,

  },
 ];

@NgModule({
  declarations: [
    CompanysComponent
  ],
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
  ]
  , 
   exports     : [
    CompanysComponent
] , 
providers   : [
  CompanysService,
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
]


})
export class CompanysModule { }
