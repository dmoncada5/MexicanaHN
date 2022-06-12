import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { BodegasService } from '../bodegas/bodegas.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Location } from '@angular/common';
import { parse } from 'date-fns';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class BodegaComponent implements OnInit {
  bodega: any = {
    cbod: null,
    ccomp: null,
    csuc: null,
    bodega: null,
    observaciones: null,
    fecha_creacion: null,
    estado: null
    
  };
  pageType: string;
  bodegaForm: FormGroup;
  company: any = [];
  sucursal: any = [];
 
  constructor(private bodegasService: BodegasService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router) { 
      this.bodegaForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]

        cbod: ['', ],
        ccomp: ['', Validators.required],
        csuc: ['', Validators.required],
        bodega: ['', Validators.required],
        observaciones: ['', Validators.required],        
        fecha_creacion: ['', Validators.required],
        estado: ['', Validators.required]   
      });
    }
    

  ngOnInit(): void {
    this.getCompany();
    this.getSucursal();
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){
      let user=JSON.parse(localStorage.getItem('usuario'));
      this.bodegaForm.controls.ccomp.setValue(parseInt(user.company)); 

      this.bodega.fecha_creacion =new Date();
      this.bodegaForm.get("fecha_creacion").setValue(this.bodega.fecha_creacion);


}else
    if (params.id) {
this.bodegasService.getBodegaOne('/bodegas/edit/', params.id).subscribe(
  (res) => {
  this.bodega = res[0];
  this.bodegaForm.controls.cbod.setValue(this.bodega['cbod']);
  this.bodegaForm.controls.ccomp.setValue(this.bodega['ccomp']);
  this.bodegaForm.controls.csuc.setValue(this.bodega['csuc']);
  this.bodegaForm.controls.bodega.setValue(this.bodega['bodega']);
  this.bodegaForm.controls.observaciones.setValue(this.bodega['observaciones']);
  this.bodegaForm.controls.fecha_creacion.setValue(this.bodega['fecha_creacion']);
  this.bodegaForm.controls.estado.setValue(this.bodega['estado']);
    
  });

    }
    
  }



  addBodega(){ 
    const data = this.bodegaForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.bodegasService.addBodega(data)

    
       .then((res) => {
  
           // Trigger the subscription with new data
           

           // Show the success message
           this._matSnackBar.open('Bodega added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });
           this.bodegasService.addProductExistencia(data);
           // Change the location with new one
  
           this.router.navigate(['configuracion/bodegas']);
       }).catch((err) => {console.log(err); });
       

 }




 saveBodega(){
   const data = this.bodegaForm.getRawValue();
   data.handle = FuseUtils.handleize(data.csuc);


   this.bodegasService.saveBodega(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Bodega saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/bodegas']);
       });

 }

 getCompany(){
   this.bodegasService.getAll('/company').subscribe(
     (res) => {
this.company = res;
     }
   );
 }

 getSucursal(){
   this.bodegasService.getAll('/sucursales').subscribe(
     (res) => {
this.sucursal = res;
     }
   );
 }

}
