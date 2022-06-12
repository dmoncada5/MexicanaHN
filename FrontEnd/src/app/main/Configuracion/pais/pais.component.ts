import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisesService } from '../paises/paises.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class PaisComponent implements OnInit {
  pais: any={
    cpais:null,
    pais:null,
    estado:null
  };
  pageType: string;
  paisForm: FormGroup;
  constructor(private paisesService: PaisesService, 
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _matSnackBar: MatSnackBar,
              private router: Router,) {
                this.paisForm = _formBuilder.group({
                  cpais: ['',],
                  pais: ['', Validators.required],
                  estado: ['', Validators.required]
                
                });
            

               }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.pageType= params.id;
    if(params.id=='new'){

}else
    if (params.id) {
this.paisesService.getPaisOne("/paises/edit/",params.id).subscribe(
  (res)=>{
  this.pais=res[0];
  this.paisForm.controls.cpais.setValue(this.pais["cpais"]);
  this.paisForm.controls.pais.setValue(this.pais["pais"]);
  this.paisForm.controls.estado.setValue(this.pais["estado"]);
  }
)

    }
  }

  addPais(){ 
     const data = this.paisForm.getRawValue();

  //  data.handle = FuseUtils.handleize(data.cpais);

 
     this.paisesService.addPais(data)
        .then((res) => {

            // Trigger the subscription with new data
 

            // Show the success message
            this._matSnackBar.open('Pais added', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

            // Change the location with new one
   
            this.router.navigate(['configuracion/paises']);
        }).catch((err)=>{console.log(err)});
        

  }
  savePais(){
    const data = this.paisForm.getRawValue();
    data.handle = FuseUtils.handleize(data.cpais);

 
    this.paisesService.savePais(data)
        .then((res) => {

            // Trigger the subscription with new data
 

            // Show the success message
            this._matSnackBar.open('Pais saved', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

            // Change the location with new one
            this.router.navigate(['configuracion/paises']);
        });

  }

}
