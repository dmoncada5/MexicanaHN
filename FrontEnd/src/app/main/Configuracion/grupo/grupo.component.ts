import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GruposService } from '../grupos/grupos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class GrupoComponent implements OnInit {
  pageType: string;
  grupoForm: FormGroup;
  company:any;
  grupos:any={
    grupoid:null, 
    ccomp:null, 
    nombre:null, 
    fecha_creacion:new Date(), 
    estado:null
  }
  
   

  constructor(private _formBuilder: FormBuilder,
    private gruposService:GruposService, 
   private activatedRoute: ActivatedRoute,
   private _matSnackBar: MatSnackBar,
   private router: Router,) {  this.grupoForm = this.createProductForm();}


   ngOnInit(): void {
this.getCompany();
    const params = this.activatedRoute.snapshot.params;
    this.pageType=params.id;

    // this.getCompany();
    // this.getSucursal();
if(params.id=='new'){

}else
    if (params.id) {
this.gruposService.getGruposOne("/grupos/edit/",params.id).subscribe(
  (res)=>{

  this.grupos=res[0];

  this.grupoForm = this.createProductForm();

  }
)

    }

  }



  getCompany(){
    this.gruposService.getAll('/company').subscribe(
      (res)=>{
this.company=res;
      }
    )
  }

  createProductForm(): FormGroup
    {
      return this._formBuilder.group({
        grupoid:[this.grupos.grupoid],
        ccomp:[this.grupos.ccomp, Validators.required],
        nombre:[this.grupos.nombre,Validators.required ],
        fecha_creacion:[this.grupos.fecha_creacion, Validators.required],
        estado:[this.grupos.estado, Validators.required]
    });
}
  addGrupos(){
    const data = this.grupoForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.cnum);
 
  
     this.gruposService.addCompany(data)
         .then((res) => {
              // Trigger the subscription with new data
  
 
             // Show the success message
             this._matSnackBar.open('Grupo added', 'OK', {
                 verticalPosition: 'top',
                 duration        : 2000
             });
 
             // Change the location with new one
    
             this.router.navigate(['configuracion/grupos']);
         }).catch((err)=>{console.log(err)});
   }

  saveGrupos(){
    const data = this.grupoForm.getRawValue();
    data.handle = FuseUtils.handleize(data.ccomp);

 
    this.gruposService.saveCompany(data)
        .then((res) => {

            // Trigger the subscription with new data
 

            // Show the success message
            this._matSnackBar.open('Numeracion saved', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

            // Change the location with new one
            this.router.navigate(['configuracion/grupos']);
        });

   }

}
