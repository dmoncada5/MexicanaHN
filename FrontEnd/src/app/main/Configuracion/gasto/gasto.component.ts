//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { GastosService } from '../gastos/gastos.service';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class GastoComponent implements OnInit {
  gasto: any = {
    cgasto: null,
    ccomp: null,
    csuc: null,
    ccuenta: null,
    monto: null,
    observaciones: null,
    fecha: null,

    
  };
  selected = 'Efectivo';
  pageType: string;
  gastoForm: FormGroup;
  company: any = [];
  sucursales: any = [];
  Cuenta: any = [];
  selectTypePago:any;
  constructor(private gastosService: GastosService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router) {
      this.gastoForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]

        cgasto: ['', ],
        ccomp: ['', Validators.required],
        csuc: ['', Validators.required],
        ccuenta: ['', Validators.required],
        monto: ['', Validators.required], 
        observaciones: ['', Validators.required], 
        fecha: ['', Validators.required],
        tipopago: ['', Validators.required],
        banco: ['', Validators.required],
   
      });
     }

  ngOnInit(): void {
    this.getCompany();
    this.getSucursal();
    this. getCuenta();

    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

      this.gasto.fecha =new Date();
      this.gastoForm.get("fecha").setValue(this.gasto.fecha);

}else
    if (params.id) {
this.gastosService.getGastoOne('/gastos/edit/', params.id).subscribe(
  (res) => {
  this.gasto = res[0];
  this.gastoForm.controls.cgasto.setValue(this.gasto['cgasto']);
  this.gastoForm.controls.ccomp.setValue(parseInt(this.gasto['ccomp']));
  this.gastoForm.controls.csuc.setValue(parseInt(this.gasto['csuc']));
  this.gastoForm.controls.ccuenta.setValue(parseInt(this.gasto['ccuenta']));
  this.gastoForm.controls.monto.setValue(this.gasto['monto']);
  this.gastoForm.controls.observaciones.setValue(this.gasto['observaciones']);
  this.gastoForm.controls.fecha.setValue(this.gasto['fecha']);
  this.gastoForm.controls.tipopago.setValue(this.gasto['tipopago']);
  this.gastoForm.controls.banco.setValue(this.gasto['banco']);
    
    
    
  });

    }
  }
  updateStatus(eve): void
  {
      // const newStatusId = Number.parseInt(this.statusForm.get('pagotipo').value);
     console.log(eve.value);
      this. selectTypePago =eve.value;

     
  }
  addGasto(){ 
    const data = this.gastoForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.gastosService.addGasto(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Gastos added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/gastos']);
       }).catch((err) => {console.log(err);});
       

 }
 saveGasto(){
   const data = this.gastoForm.getRawValue();
   data.handle = FuseUtils.handleize(data.cgasto);


   this.gastosService.saveGasto(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Gastos saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/gastos']);
       });

 }

 getCompany(){
   this.gastosService.getAll('/company').subscribe(
     (res) => {
this.company = res;
     }
   );
 }

 getSucursal(){
   this.gastosService.getAll('/sucursales').subscribe(
     (res) => {
this.sucursales = res;
     }
   );
 }

 getCuenta(){
  this.gastosService.getAll('/cgastos').subscribe(
    (res) => {
this.Cuenta = res;
    }
  );
}


}
