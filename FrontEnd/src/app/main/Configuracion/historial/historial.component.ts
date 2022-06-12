//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { HistorialsService } from '../historials/historials.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class HistorialComponent implements OnInit {
  historial: any = {
    chist: null,
    ccomp: null,
    csuc: null,
    csocio: null,
    producto: null,
    pesoini: null,
    pesoact: null,  
    talla: null,
    imc: null,
    ptr: null,
    areagrasa: null,
    areamusc: null,
    estado: null,
    fechacreacion: null
    
    
  };
  pageType: string;
  historialForm: FormGroup;
  company: any = [];
  sucursal: any = [];
  socionegocio: any = [];

  constructor(private historialsService: HistorialsService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router) {
      this.historialForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]

        chist: ['', ],
        ccomp: ['', Validators.required],
        csuc: ['', Validators.required],
        csocio: ['', Validators.required],
        producto: ['', Validators.required], 
        pesoini: ['', Validators.required],
        pesoact: ['', Validators.required],       
        talla: ['', Validators.required],
        imc: ['', Validators.required],
        ptr: ['', Validators.required],
        areagrasa: ['', Validators.required],
        areamusc: ['', Validators.required],        
        estado: ['', Validators.required],
        fechacreacion: ['', Validators.required]

      });

     }

  ngOnInit(): void {
    this.getCompany();
    this.getSucursal();
    this.getSocioNegocio();

    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

}else
    if (params.id) {
this.historialsService.getHistorialOne('/historial/edit/', params.id).subscribe(
  (res) => {
  this.historial = res[0];
  this.historialForm.controls.chist.setValue(this.historial['chist']);
  this.historialForm.controls.ccomp.setValue(this.historial['ccomp']);
  this.historialForm.controls.csuc.setValue(this.historial['csuc']);
  this.historialForm.controls.csocio.setValue(this.historial['csocio']);
  this.historialForm.controls.producto.setValue(this.historial['producto']);
  this.historialForm.controls.pesoini.setValue(this.historial['pesoini']);
  this.historialForm.controls.pesoact.setValue(this.historial['pesoact']);
  this.historialForm.controls.talla.setValue(this.historial['talla']);
  this.historialForm.controls.imc.setValue(this.historial['imc']);
  this.historialForm.controls.ptr.setValue(this.historial['ptr']);
  this.historialForm.controls.areagrasa.setValue(this.historial['areagrasa']);
  this.historialForm.controls.areamusc.setValue(this.historial['areamusc']);
  this.historialForm.controls.estado.setValue(this.historial['estado']);
  this.historialForm.controls.fechacreacion.setValue(this.historial['fechacreacion']);
    
  });

    }
  }

  addHistorial(){ 
    const data = this.historialForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.historialsService.addHistorial(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Hstorial added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/historials']);
       }).catch((err) => {console.log(err);});
       

 }
 saveHistorial(){
   const data = this.historialForm.getRawValue();
   data.handle = FuseUtils.handleize(data.chist);


   this.historialsService.saveHistorial(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Historial saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/historials']);
       });

 }

 getCompany(){
   this.historialsService.getAll('/company').subscribe(
     (res) => {
this.company = res;
     }
   );
 }

 getSucursal(){
   this.historialsService.getAll('/sucursales').subscribe(
     (res) => {
this.sucursal = res;
     }
   );
 }

 getSocioNegocio(){
  this.historialsService.getAll('/socionegocio').subscribe(
    (res) => {
this.socionegocio = res;
    }
  );
}

}
