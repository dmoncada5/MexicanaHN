//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { MonedasService } from '../monedas/monedas.service';

@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class MonedaComponent implements OnInit {
  moneda: any = {
    cmon: null,
    ccomp: null,
    cpais: null,
    moneda: null,
    abrev: null,
    pcompra: null,
    pventa: null,    
    fecha_creacion: null,
    estado: null
    
  };
  pageType: string;
  monedaForm: FormGroup;
  company: any = [];
  paises: any = [];
  constructor(private monedasService: MonedasService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router) {
      this.monedaForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]

        cmon: ['', ],
        ccomp: ['', Validators.required],
        cpais: ['', Validators.required],
        moneda: ['', Validators.required],
        abrev: ['', Validators.required], 
        pcompra: ['', Validators.required],
        pventa: ['', Validators.required],       
        fecha_creacion: ['', Validators.required],
        estado: ['', Validators.required]   
      });
     }

  ngOnInit(): void {
    this.getCompany();
    this.getPais();
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

}else
    if (params.id) {
this.monedasService.getMonedaOne('/monedas/edit/', params.id).subscribe(
  (res) => {
  this.moneda = res[0];
  this.monedaForm.controls.cmon.setValue(this.moneda['cmon']);
  this.monedaForm.controls.ccomp.setValue(this.moneda['ccomp']);
  this.monedaForm.controls.cpais.setValue(this.moneda['cpais']);
  this.monedaForm.controls.moneda.setValue(this.moneda['moneda']);
  this.monedaForm.controls.abrev.setValue(this.moneda['abrev']);
  this.monedaForm.controls.pcompra.setValue(this.moneda['pcompra']);
  this.monedaForm.controls.pventa.setValue(this.moneda['pventa']);
  this.monedaForm.controls.fecha_creacion.setValue(this.moneda['fecha_creacion']);
  this.monedaForm.controls.estado.setValue(this.moneda['estado']);
    
  });

    }
  }

  addMoneda(){ 
    const data = this.monedaForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.monedasService.addMoneda(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Moneda added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/monedas']);
       }).catch((err) => {console.log(err);});
       

 }
 saveMoneda(){
   const data = this.monedaForm.getRawValue();
   data.handle = FuseUtils.handleize(data.cmon);


   this.monedasService.saveMoneda(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Moneda saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/monedas']);
       });

 }

 getCompany(){
   this.monedasService.getAll('/company').subscribe(
     (res) => {
this.company = res;
     }
   );
 }

 getPais(){
   this.monedasService.getAll('/paises').subscribe(
     (res) => {
this.paises = res;
     }
   );
 }

}
