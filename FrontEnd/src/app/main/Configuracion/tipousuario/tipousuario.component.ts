import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { TipoUsuariosService } from '../tipousuarios/tipousuarios.service';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-tipousuario',
  templateUrl: './tipousuario.component.html',
  styleUrls: ['./tipousuario.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class TipoUsuarioComponent implements OnInit {
  ELEMENT_DATA: Element[] = [];

   displayedColumns = [ 'Permisos', 'Status'];
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
    tusuario: any={
        ctipou:0,
        ccomp:0,
        tipou:null,
        observaciones:null,
        estado:null
      };
      pageType: string;
      Npermisos:any;
      tipousuarioForm: FormGroup;
      company: any = [];
      tipouser:any;
      control:number=0;
      constructor(private tipousuariosService: TipoUsuariosService, 
                  private activatedRoute: ActivatedRoute,
                  private _formBuilder: FormBuilder,
                  private _matSnackBar: MatSnackBar,
                  private router: Router,) {
                    this.tipousuarioForm = _formBuilder.group({
                      ctipou: [0,],
                      ccomp: [0, Validators.required],
                      tipou: ['', Validators.required],
                      observaciones: ['', Validators.required],
                      estado: ['', Validators.required]
                    
                    });
                
    
                   }

  ngOnInit(): void {
    this.getCompany();
    const params = this.activatedRoute.snapshot.params;
    this.pageType= params.id;



    if(params.id=='new'){

}else
    if (params.id) {
this.tipousuariosService.getTipoUsuarioOne("/tipousuarios/edit/",params.id).subscribe(
  (res)=>{
  this.tusuario=res[0];
  this.tipousuarioForm.controls.ctipou.setValue(this.tusuario["ctipou"]);
  this.tipousuarioForm.controls.ccomp.setValue(this.tusuario["ccomp"]);
  this.tipousuarioForm.controls.tipou.setValue(this.tusuario["tipou"]);
  this.tipousuarioForm.controls.observaciones.setValue(this.tusuario["observaciones"]);
  this.tipousuarioForm.controls.estado.setValue(this.tusuario["estado"]);
this.tipouser=this.tusuario["tipou"];
  this.permisos();
  }
)
    }
  }

  applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
}

permisos(){

  this.tipousuariosService.getAll("/tipousuarios/permisos").subscribe(
    (res)=>{
    
      let user=JSON.parse(localStorage.getItem('usuario'));
      this.tipousuariosService.getPermisosU("/tipousuarios/permisosU",this.tipouser).subscribe(
        (res1:any[])=>{
  
         
          this.Npermisos=res;
          for(let index=0;index<this.Npermisos.length;index++){
      this.control==0;
  
            for(let indexx=0;indexx<res1.length;indexx++){
      if(this.Npermisos[index]['Nombre']===res1[indexx]['nombre']){

    this.ELEMENT_DATA.push({user:this.tusuario["tipou"],permisos:res1[indexx]['nombre'],valor:res1[indexx]['permiso'],estructura:this.Npermisos[index]['Estructura']});
    this.control=1;
    break;
  }
  if (indexx+1==res1.length){
    this.ELEMENT_DATA.push({user:this.tusuario["tipou"],permisos:this.Npermisos[index]['Nombre'],valor:'SA',estructura:this.Npermisos[index]['Estructura']})
           
  }
            } 
  
  
          //   if(this.control==0){
          // this.ELEMENT_DATA.push({user:this.tusuario["tipou"],permisos:this.Npermisos[index]['Nombre'],valor:'SA',estructura:this.Npermisos[index]['Estructura']})
          //   }
            // this.ELEMENT_DATA.push({user:'aa',permisos:this.Npermisos[index]['Nombre'],valor:'N'})
          } 
if (res1.length==0){
  for(let index=0;index<this.Npermisos.length;index++){
    this.ELEMENT_DATA.push({user:this.tusuario["tipou"],permisos:this.Npermisos[index]['Nombre'],valor:'SA',estructura:this.Npermisos[index]['Estructura']})
       

  }

  console.log( this.ELEMENT_DATA)
}


          this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
        
          console.log(this.ELEMENT_DATA)
      
        }
      )
    }
  )
}

  addTipoUsuario(){ 
    const data = this.tipousuarioForm.getRawValue();
 //  data.handle = FuseUtils.handleize(data.cpais);
    this.tipousuariosService.addTipoUsuario(data)
       .then((res) => {

           // Trigger the subscription with new data
           // Show the success message
           this._matSnackBar.open('Tipo User added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });
           // Change the location with new one
           this.router.navigate(['configuracion/tipousuarios']);
       }).catch((err)=>{console.log(err)});
       

 }
 saveTipoUsuario(){
   const data = this.tipousuarioForm.getRawValue();
   data.handle = FuseUtils.handleize(data.ctipou);
   this.tipousuariosService.saveTipoUsuario(data)
       .then((res) => {
           // Trigger the subscription with new data
           // Show the success message

           for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

            this.tipousuariosService.ActualizarPermiso('/tipousuarios/Actualizarpermiso',this.tusuario["tipou"],this.ELEMENT_DATA[index]['permisos'],this.ELEMENT_DATA[index]['estructura'],this.ELEMENT_DATA[index]['valor']).subscribe(
              res=>{

              }
            )


        
           }






           this._matSnackBar.open('Tipo User saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/tipousuarios']);
       });

 }

Change(){

}

 getCompany(){
    this.tipousuariosService.getAll('/company').subscribe(
      (res) => {
 this.company = res;
      }
    )
  }
 

}

export interface Element {
user:string; permisos: string; valor: string; estructura:string
}
