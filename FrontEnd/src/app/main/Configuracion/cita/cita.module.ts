import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatRippleModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseWidgetModule } from '../../../../@fuse/components';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CitaComponent } from '../cita/cita.component';
import { CitasComponent } from '../citas/citas.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GuardallGuard } from 'app/main/autenticar/guardall.guard';
const routes = [
  {
      path     : 'configuracion/citas/:exp', 
      component: CitasComponent,
      canActivate: [GuardallGuard],
  

  }]; 

@NgModule({
    declarations: [
      CitaComponent
    ],
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
      MatAutocompleteModule
    ],
    providers: [
  
      // {provide: DateAdapter, useClass: AppDateAdapter},
      // {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
      { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    ]
   
  })
export class CitaModule { }
