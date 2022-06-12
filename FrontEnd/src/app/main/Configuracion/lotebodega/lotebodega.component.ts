import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { LotebodegasService } from '../lotebodegas/lotebodegas.service';
@Component({
  selector: 'app-lotebodega',
  templateUrl: './lotebodega.component.html',
  styleUrls: ['./lotebodega.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class LotebodegaComponent implements OnInit {
  lotebodega: any = {
    clbod: null,
    ccomp: null,
    csuc: null,
    cbod: null,
    lote:null,
    ubicacion: null,
    observaciones: null,
    fecha_creacion: null,
    estado: null
    
  };
  pageType: string;
  lotebodegaForm: FormGroup;
  company: any = [];
  sucursal: any = [];
  bodega: any = [];

  constructor(private lotebodegasService: LotebodegasService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router) {
      this.lotebodegaForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]

        clbod: ['', ],
        ccomp: ['', Validators.required],
        csuc: ['', Validators.required],
        cbod: ['', Validators.required],
        lote: ['', Validators.required],
        ubicacion: ['', Validators.required],
        observaciones: ['', Validators.required],        
        fecha_creacion: ['', Validators.required],
        estado: ['', Validators.required]   
      });
     }

  ngOnInit(): void {
    this.getCompany();
    this.getSucursal();
    this.getBodega();
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

}else
    if (params.id) {
this.lotebodegasService.getLoteBodegaOne('/lotebodega/edit/', params.id).subscribe(
  (res) => {
  this.lotebodega = res[0];
  this.lotebodegaForm.controls.clbod.setValue(this.lotebodega['clbod']);
  this.lotebodegaForm.controls.ccomp.setValue(this.lotebodega['ccomp']);
  this.lotebodegaForm.controls.csuc.setValue(this.lotebodega['csuc']);
  this.lotebodegaForm.controls.cbod.setValue(this.lotebodega['cbod']);
  this.lotebodegaForm.controls.lote.setValue(this.lotebodega['lote']);
  this.lotebodegaForm.controls.ubicacion.setValue(this.lotebodega['ubicacion']);
  this.lotebodegaForm.controls.observaciones.setValue(this.lotebodega['observaciones']);
  this.lotebodegaForm.controls.fecha_creacion.setValue(this.lotebodega['fecha_creacion']);
  this.lotebodegaForm.controls.estado.setValue(this.lotebodega['estado']);
    
  });

    }
  }

  addLoteBodega(){ 
    const data = this.lotebodegaForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.lotebodegasService.addLoteBodega(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Lote de Bodega added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/lotebodegas']);
       }).catch((err) => {console.log(err);});
       

 }
 saveLoteBodega(){
   const data = this.lotebodegaForm.getRawValue();
   data.handle = FuseUtils.handleize(data.clbod);


   this.lotebodegasService.saveLoteBodega(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Lote de Bodega saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/lotebodegas']);
       });

 }

 getCompany(){
   this.lotebodegasService.getAll('/company').subscribe(
     (res) => {
this.company = res;
     }
   );
 }

 getSucursal(){
   this.lotebodegasService.getAll('/sucursales').subscribe(
     (res) => {
this.sucursal = res;
     }
   );
 }

 getBodega(){
  this.lotebodegasService.getAll('/bodegas').subscribe(
    (res) => {
this.bodega = res;
    }
  );
}

}
