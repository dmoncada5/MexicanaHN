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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatAutocomplete, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule,} from '@angular/material-moment-adapter';
import { CotizacionesComponent } from '../cotizaciones/cotizaciones.component'
import { EntregasComponent } from '../entregas/entregas.component'

import { MatMenuModule } from '@angular/material/menu';
import { PrintentregaComponent } from './printentrega.component';
const routes = [
  {
      path     : 'ventas/entregas',
      component: EntregasComponent,
  }];
@NgModule({
  declarations: [PrintentregaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatAutocompleteModule,
    TranslateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDatepickerModule, 
    MatChipsModule,
    MatSortModule,
     NgxChartsModule,
     MatMenuModule,
    FuseSharedModule,
    FuseWidgetModule
  ]
})
export class PrintentregaModule { }
