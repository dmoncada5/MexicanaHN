import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { PreciosService } from '../precios/precios.service';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class PrecioComponent implements OnInit {
  precios: any = {
    codPrice: null,
    ItemCode: null,
    Pricelist: null,
    price: null,
    CurrCode: null,
    factor: null
  };
  pageType: string;
  preciosForm: FormGroup;
  productos: any;  
  listas: any;
  monedas: any;
  codlista: any;

  constructor(private preciosService: PreciosService, 
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _matSnackBar: MatSnackBar,
              private router: Router, ) {
      this.preciosForm = _formBuilder.group({
        codPrice:['', ],
        ItemCode: ['', ],
        Pricelist: ['', Validators.required],
        price: ['', Validators.required],
        CurrCode: ['', ],
        factor: ['', ]   
      
      });
     }

  ngOnInit(): void {
    this.getProducto();
    this.getListaPrecio();
    // this.getMoneda();
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

}else
    if (params.id) {
this.preciosService.getPrecioOne('/productsprice/edit/', params.id ).subscribe(
  (res) => {
  this.precios = res[0];
  this.preciosForm.controls.codPrice.setValue(this.precios['codPrice'])
  this.preciosForm.controls.ItemCode.setValue(this.precios['ItemCode']);
  this.preciosForm.controls.Pricelist.setValue(this.precios['Pricelist']);
  // this.codlista = res[0]['Pricelist'];
  this.preciosForm.controls.price.setValue(this.precios['price']);
  this.preciosForm.controls.CurrCode.setValue(this.precios['CurrCode']);
  this.preciosForm.controls.factor.setValue(this.precios['factor']);

  }
);

    }
  }

  addPrecio(){ 
    const data = this.preciosForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.preciosService.addPrecio(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Precio added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/precios']);
       }).catch((err) => {console.log(err); });
       

 }
 savePrecio(){
   const data = this.preciosForm.getRawValue();
   data.handle = FuseUtils.handleize(data.ItemCode);


   this.preciosService.savePrecio(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Precio saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/precios']);
       });

 }

 getProducto(){
   this.preciosService.getAll('/products').subscribe(
     (res) => {
this.productos = res;
     }
   );
 }

 getListaPrecio(){
   this.preciosService.getAll('/listaprecios').subscribe(
     (res) => {
this.listas = res;
     }
   );
 }

//  getMoneda(){
//   this.preciosService.getAll('/monedas').subscribe(
//     (res) => {
// this.monedas = res;
//     }
//   );
// }


}
