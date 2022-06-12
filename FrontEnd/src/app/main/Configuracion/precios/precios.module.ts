import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
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

import { PreciosComponent} from './precios.component'
import { PrecioComponent } from '../precio/precio.component';
import { PreciosService } from './precios.service';
import { GuardallGuard } from 'app/main/autenticar/guardall.guard';

const routes = [
    {
        path     : 'configuracion/precios',
        component: PreciosComponent,
        canActivate: [GuardallGuard],
        resolve  : {
            data: PreciosService
        }
    },
    {
        path     : 'precios/:id',
        component: PrecioComponent,
  
    },
   ];



   @NgModule({
    declarations: [
      PreciosComponent
  ],
  imports     : [
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
      PreciosComponent
  ] ,
  providers   : [
    PreciosService
  ]
  })
export class PreciosModule { }
