import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Login: any = {
    usuario: null,
    password: null,
    company:0    ,
    tipoUser:null,
    nombre:null,
    apellido:null
  };
  company: any = [];
  constructor(      private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private _matSnackBar: MatSnackBar,
    private router: Router) { this._fuseConfigService.config = {
      layout: {
          navbar   : {
              hidden: true
          },
          toolbar  : {
              hidden: true
          },
          footer   : {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  }; }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      user   : ['', [Validators.required]],
      password: ['', Validators.required],
      comp: [0, Validators.required]
  });
  this.getCompany();
  }
  getCompany(){
    this.loginService.getAll('/company').subscribe(
      (res) => {
 this.company = res;
      }
    );
  }
  login(){
    const data = this.loginForm.getRawValue();

    this.loginService.getUserOne('/login',data.user,data.password,data.comp).subscribe(
      (res)=>{

   if (res.toString()==""){
    this._matSnackBar.open('Usuario o Contraseña incorrecta', 'OK', {
      verticalPosition: 'top',
      duration        : 2000
    })
   }else{
     this.Login.usuario=res[0].usuario;
     this.Login.password=res[0].clave;
     this.Login.company=res[0].ccomp;
     this.Login.tipoUser=res[0].tipou;
     this.Login.nombre=res[0].nombres;
     this.Login.apellido=res[0].apellidos;
  this.loginService.saveStorage(this.Login);
  this.router.navigate(['/configuracion/inicio']);
   }
      }
    )
  }
}
