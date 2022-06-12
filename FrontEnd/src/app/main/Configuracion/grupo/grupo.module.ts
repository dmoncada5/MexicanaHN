import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanysComponent } from '../companys/companys.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GruposComponent } from '../grupos/grupos.component';
import { GrupoComponent } from './grupo.component';
import { RouterModule } from '@angular/router';
import { GuardallGuard } from 'app/main/autenticar/guardall.guard';


const routes = [
  {
      path     : 'configuracion/grupos',
      component: GruposComponent,
      canActivate: [GuardallGuard],
   
  }];
@NgModule({
  declarations: [GrupoComponent],
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
export class GrupoModule { }
