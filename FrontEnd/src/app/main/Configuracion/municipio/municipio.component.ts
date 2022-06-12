import { Component, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MunicipiosService } from '../municipios/municipios.service';


@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class MunicipioComponent implements OnInit {
  municipios: any={
    cmuni:null,
    cpais:null,
    cdepa:null,
    municipio:null,    
    estado:null
  };
  pageType: string; 
  municipioForm: FormGroup;
  departamentos:any=[];  
  paises:any=[];
  
  constructor(    private _formBuilder: FormBuilder,
    private municipiosService: MunicipiosService, 
    private activatedRoute: ActivatedRoute,
    private _matSnackBar: MatSnackBar,
    private router: Router,) { 
      this.municipioForm = this.createProductForm();


    }

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;
    this.pageType= params.id;
    this.getDepartamento();
    this.getPais();
    if(params.id=='new'){

}else
    if (params.id) {
this.municipiosService.getMunicipioOne("/municipios/edit/",params.id).subscribe(
  (res)=>{
  this.municipios=res[0];
  this.municipioForm = this.createProductForm();

  }
)

    }
  }

  createProductForm(): FormGroup
    {
      return this._formBuilder.group({
        cmuni:[this.municipios.cmuni],
        cpais:[this.municipios.cpais, Validators.required],
        cdepa:[this.municipios.cdepa, Validators.required],
        municipio:[this.municipios.municipio, Validators.required],
        estado:[this.municipios.estado, Validators.required]
        
    });
}


  addMunicipio(){ 
    const data = this.municipioForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.municipiosService.addMunicipio(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Municipio added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/municipios']);
       }).catch((err) => {console.log(err);});
       

 }
 saveMunicipio(){
   const data = this.municipioForm.getRawValue();
   data.handle = FuseUtils.handleize(data.cmuni);


   this.municipiosService.saveMunicipio(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Municipio saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/municipios']);
       });

 }

 getDepartamento(){
   this.municipiosService.getAll('/departamentos').subscribe(
     (res) => {
this.departamentos = res;
     }
   );
 }

 getPais(){
   this.municipiosService.getAll('/paises').subscribe(
     (res) => {
this.paises = res;
     }
   );
 }



}
