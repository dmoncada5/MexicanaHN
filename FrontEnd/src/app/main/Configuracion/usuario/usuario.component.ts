import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { UsuariosService } from '../usuarios/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class UsuarioComponent implements OnInit {
usuario: any = {
        cuser: null,
        ccomp: null,
        csuc: null,
        ctipou: null,
        cemp: null,
        usuario: null,
        clave: null,
        observaciones: null,
        estado: null
        
      };
      pageType: string;
      usuarioForm: FormGroup;
      company: any = [];
      sucursal: any = [];
      usuarios: any = [];
      empleado: any = [];
      tipousuario: any = [];
  constructor(private usuariosService: UsuariosService, 
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _matSnackBar: MatSnackBar,
              private router: Router) {
      this.usuarioForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]

        cuser: ['', ],
        ccomp: ['', Validators.required],
        csuc: ['', Validators.required],
        ctipou: ['', Validators.required],
        cemp: ['', Validators.required],
        usuario: ['', Validators.required],
        clave: ['', Validators.required],
        observaciones: ['', Validators.required],
        estado: ['', Validators.required]   
      });
    }



  ngOnInit(): void {
          this.getCompany();
          this.getSucursal();
          this.getEmpleado();
          this.getTipoUsuario();
          const params = this.activatedRoute.snapshot.params;
          this.pageType = params.id;
          if (params.id == 'new'){
    
    }else
        if (params.id) {
    this.usuariosService.getUsuarioOne('/usuarios/edit/', params.id).subscribe(
      (res) => {
      this.usuario = res[0];
      this.usuarioForm.controls.cuser.setValue(this.usuario['cuser']);
      this.usuarioForm.controls.ccomp.setValue(this.usuario['ccomp']);
      this.usuarioForm.controls.csuc.setValue(this.usuario['csuc']);
      this.usuarioForm.controls.ctipou.setValue(this.usuario['ctipou']);
      this.usuarioForm.controls.cemp.setValue(this.usuario['cemp']);
      this.usuarioForm.controls.usuario.setValue(this.usuario['usuario']);
      this.usuarioForm.controls.clave.setValue(this.usuario['clave']);
      this.usuarioForm.controls.observaciones.setValue(this.usuario['observaciones']);
      this.usuarioForm.controls.estado.setValue(this.usuario['estado']);
        
      });
    
        }

  }




  addUsuario(){ 
    const data = this.usuarioForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.usuariosService.addUsuario(data)
       .then((res) => {
 
           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('User added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/usuarios']);
       }).catch((err) => {console.log(err);});
       

 }
 saveUsuario(){
   const data = this.usuarioForm.getRawValue();

   data.handle = FuseUtils.handleize(data.csuc);


   this.usuariosService.saveUsuario(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('User saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/usuarios']);
       });

 }

 getCompany(){
   this.usuariosService.getAll('/company').subscribe(
     (res) => {
this.company = res;
     }
   );
 }


 getSucursal(){
    this.usuariosService.getAll('/sucursales').subscribe(
      (res) => {
 this.sucursal = res;
      }
    );
  }
 
 
  getEmpleado(){
     this.usuariosService.getAllMio('/empleados').subscribe(
       (res) => {
  this.empleado = res;
       }
     );
   }
  

   getTipoUsuario(){
    this.usuariosService.getAll('/tipousuarios').subscribe(
      (res) => {
 this.tipousuario = res;
      }
    );
  }
 

}
