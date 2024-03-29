import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseWidgetModule } from '../../../../@fuse/components';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, } from '@angular/material-moment-adapter';
import { StocktransfersComponent } from '../stocktransfers/stocktransfers.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
//import {PrintstocktransferComponent} from '../printstocktransfer/printstocktransfer.component';
import { StocktransferComponent } from './stocktransfer.component';
import { PrintTrasladoComponent } from '../printtraslado/printtraslado.component';

const routes = [
    {
        
        path     : 'ventas/stocktransfers',
        component: StocktransfersComponent,
    }
    ,
    {
      path: 'ventas/printtraslado/:id',
      component: PrintTrasladoComponent
    }
];
  



@NgModule({
        declarations: [StocktransferComponent],
        imports: [
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
        ],
        providers: [ 
      
          // {provide: DateAdapter, useClass: AppDateAdapter},
          // {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
          { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
          { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        ] 
        
      })
export class StocktransferModule
{
}
