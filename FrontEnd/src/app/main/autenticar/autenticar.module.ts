import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { LoginService} from './login/login.service'



@NgModule({
  declarations: [      
]
,
  imports: [
    LoginModule
   // GruposModule,
    //GrupoModule,    
  
  ],
  providers   : [
 LoginService
]
})
export class AutenticarModule { }
