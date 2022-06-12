import { NgModule } from '@angular/core';
import { MainComponent } from './sidebars/main/main.component';
import { SocioslistComponent } from './socioslist/socioslist.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { SocioFormComponent } from './socio-form/socio-form.component'
import { SociosService } from './socios.service';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { SociosComponent } from './socios/socios.component';
import { MatSelectModule } from '@angular/material/select';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { GuardallGuard } from '../autenticar/guardall.guard';

const routes: Routes = [
  {
      path     : 'socios-negocios/socios',
      component: SociosComponent,
      canActivate: [GuardallGuard],
      resolve  : {
         contacts: SociosService
      }
  } 
];

 @NgModule({
  declarations: [
    MainComponent,
    SelectedBarComponent,
    SociosComponent,
    MainComponent,
    SocioslistComponent,
    SocioFormComponent
    
    

],
 
  imports: [
    RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule

  ],
  providers      : [
      SociosService,
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
      { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ]
  
})
export class SociosNegociosModule { }