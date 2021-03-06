import { NgModule } from '@angular/core';
import { ValidacionesComponent } from './validaciones.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ValidacionesService } from './validaciones.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

 


  const routes = [
    {
      path     : 'configuracion/validaciones', 
        component: ValidacionesComponent,
       // canActivate: [GuardallGuard],
        // resolve  : {
        //     data: ValidacionesService
        // }
    }
   ];

@NgModule({
  declarations: [
    ValidacionesComponent
  ],
  
    exports     : [
  
        ValidacionesComponent
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
  ],
  providers   : [
      ValidacionesService
]
})
export class ValidacionesModule { }
