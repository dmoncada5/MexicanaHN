import { Component, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NumeracionesService } from '../numeraciones/numeraciones.service';

@Component({
  selector: 'app-numeracion',
  templateUrl: './numeracion.component.html',
  styleUrls: ['./numeracion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class NumeracionComponent implements OnInit {
  numeracion: any={
    cnum:null,
    Serie:null, 
    ccomp:0, 
    csuc:null, 
    cai:null, 
    fact_emini:null, 
    fact_emifin:null, 
    correo:null, 
    fecha_limite:null, 
    fecha_creacion:null, 
    correlativo:0, 
    tipo_documento:null, 
    prefijo:null,
    estado:null
  };
  pageType: string;
  numeracionForm: FormGroup;

  company: any = [];
  sucusal:any=[];
  constructor( private _formBuilder: FormBuilder,
               private numeracionService:NumeracionesService, 
               private activatedRoute: ActivatedRoute,
               private _matSnackBar: MatSnackBar,
               private router: Router,
              ) { 
 
      

                
    // this.paisForm = _formBuilder.group({
    //   cnum:[this.numeracion.cnum],
    //   Serie:[this.numeracion.Serie],
    //   ccomp:[this.numeracion.ccomp],
    //   csuc:[this.numeracion.csuc],
    //   cai:[this.numeracion.cai],
    //   fact_emini:[this.numeracion.fact_emini],
    //   fact_emifin:[this.numeracion.fact_emifin],
    //   correo:[this.numeracion.correo],
    //   fecha_limite:[this.numeracion.fecha_limite],
    //   fecha_creacion:[this.numeracion.fecha_creacion],
    //   correlativo:[this.numeracion.correlativo],
    //   tipo_documento:[this.numeracion.tipo_documento],
    //   estado:[this.numeracion.estado]
    // });

    this.numeracionForm = this.createProductForm();
   
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.pageType=params.id;
    this.getCompany();
    this.getSucursal();
    if(params.id=='new'){

}else
    if (params.id) {
this.numeracionService.getNumeracionOne("/numeracion/edit/",params.id).subscribe(
  (res)=>{
   
  //this.numeracion= JSON.parse(JSON.stringify(res[0]));
  this.numeracion=res[0];

  this.numeracionForm = this.createProductForm();
  // const data = moment(this.numeracionForm.get('fecha_limite').value).format('YYYY-MM-DD');
  // this.numeracionForm.get('fecha_limite').setValue(data);
  // const toSelect = this.numeracion.ccomp;
  // this.numeracionForm.get('ccomp').setValue(toSelect);
  // this.paisForm.controls.cpais.setValue(this.numeracion["cpais"]);
  // this.paisForm.controls.pais.setValue(this.pais["pais"]);
  // this.paisForm.controls.estado.setValue(this.pais["estado"]);
  }
)

    }

  }

  getCompany(){
    this.numeracionService.getAll('/company').subscribe(
      (res)=>{
this.company=res;
      }
    )
  }

  getSucursal(){
    this.numeracionService.getAll('/sucursales').subscribe(
      (res)=>{
this.sucusal=res;
      }
    )
  }

  createProductForm(): FormGroup
    {
      return this._formBuilder.group({
        cnum:[this.numeracion.cnum],
        Serie:[this.numeracion.Serie, Validators.required],
        ccomp:[this.numeracion.ccomp, Validators.required],
        csuc:[this.numeracion.csuc, Validators.required],
        cai:[this.numeracion.cai, Validators.required],
        fact_emini:[this.numeracion.fact_emini, Validators.required],
        fact_emifin:[this.numeracion.fact_emifin, Validators.required],
        correo:[this.numeracion.correo, Validators.required],
        fecha_limite:[this.numeracion.fecha_limite, Validators.required],
        fecha_creacion:[this.numeracion.fecha_creacion, Validators.required],
        correlativo:[this.numeracion.correlativo, Validators.required],
        tipo_documento:[this.numeracion.tipo_documento, Validators.required],
        prefijo:[this.numeracion.prefijo],
        estado:[this.numeracion.estado, Validators.required]
    });
}



  addNumeracion(){
    const data = this.numeracionForm.getRawValue();

   // data.handle = FuseUtils.handleize(data.cnum);

 
    this.numeracionService.addNumeracion(data)
        .then((res) => {
             // Trigger the subscription with new data
 

            // Show the success message
            this._matSnackBar.open('Numeracion guardada!', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

            // Change the location with new one
   
            this.router.navigate(['configuracion/numeraciones']);
        }).catch((err)=>{console.log(err)});
        
  }

  saveNumeracion(){
    const data = this.numeracionForm.getRawValue();
    data.handle = FuseUtils.handleize(data.cnum);

    this.numeracionService.saveNumeracion(data)
        .then((res) => {

            // Trigger the subscription with new data
 

            // Show the success message
            this._matSnackBar.open('Numeracion saved', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

            // Change the location with new one
            this.router.navigate(['configuracion/numeraciones']);
        });

  }
}

