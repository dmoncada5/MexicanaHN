import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseWidgetModule } from '../../../../@fuse/components';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NumeracionesComponent } from '../numeraciones/numeraciones.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NumeracionesService } from '../numeraciones/numeraciones.service';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule,} from '@angular/material-moment-adapter';
import {AppDateAdapter, APP_DATE_FORMATS} from '../numeracion/format-datepicker'
import { CompanysComponent } from '../companys/companys.component';
import { CompanyComponent } from './company.component';
import { GuardallGuard } from 'app/main/autenticar/guardall.guard';

const routes = [
  {
      path     : 'configuracion/companys',
      component: CompanysComponent,
      canActivate: [GuardallGuard],
   
  }];

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    RouterModule.forChild(routes),
    MatFormFieldModule,
    TranslateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    FuseSharedModule,
    FuseWidgetModule,
    MatDatepickerModule,
  ]
})
export class CompanyModule { }
