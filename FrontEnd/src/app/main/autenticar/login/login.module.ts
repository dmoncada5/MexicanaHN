import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import {LoginComponent} from './login.component'
import { MatSelectModule } from '@angular/material/select';
import { GuardallGuard } from '../guardall.guard';

const routes = [
  {
      path     : 'auth/login',
      component: LoginComponent,
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports     : [
      RouterModule.forChild(routes),

      MatButtonModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
      FuseSharedModule
  ],
  entryComponents: [
    LoginComponent
  ] 
})
export class LoginModule { }
