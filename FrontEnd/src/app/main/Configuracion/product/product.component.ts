import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ProductsService } from '../products/products.service';
import { fuseAnimations } from '../../../../@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { parse } from 'date-fns';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ProductComponent implements OnInit {


    products: any = {
    ItemCode : null,
    ItemName : null,
    FechaCreacion : null,
   // FechaVencimiento : null,
    impuesto : null,
    costo : null, 
    observaciones : null,
    estado : null,
    ccomp:null,
   // propiedad: null,
    cbod:null
    };

    pageType: string;
    productForm: FormGroup;
    company: any = [];
    bodega: any = [];
    sucursal: any = [];
    categorias: any = [];
    proveedor: any = [];
    constructor(private productsService: ProductsService, 
                private activatedRoute: ActivatedRoute,
                private _formBuilder: FormBuilder,
                private _matSnackBar: MatSnackBar,
                private router: Router) {
this.productForm = _formBuilder.group({
  // cpais: ['',],
  // pais: ['', Validators.required],
  // estado: ['', Validators.required]

  ItemCode : ['', ],
  ItemName : ['', Validators.required],
  FechaCreacion : ['', Validators.required],
 // FechaVencimiento : ['', ],
  impuesto : ['', Validators.required],
  costo : [''],
  observaciones : ['', Validators.required],
  estado : ['', Validators.required],
  ccomp:['', Validators.required],
 // propiedad:['', ],
  cbod:['', ]
});
}
 
  ngOnInit(): void {
    this.getCompany();
    this.getBodega();
     // tslint:disable-next-line: align
    this.getProveedor();
    this.getCategorias();
 
    // this.getSucursal();
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

      let user=JSON.parse(localStorage.getItem('usuario'));
      this.productForm.controls.ccomp.setValue(parseInt(user.company));  

      this.products.FechaCreacion =new Date();
      this.productForm.get("FechaCreacion").setValue(this.products.FechaCreacion);


}else
  if (params.id) {
this.productsService.getProductOne('/productsI/edit/', params.id).subscribe(
(res) => {

    this.products = res[0];
    this.productForm.controls.ItemCode.setValue(this.products['ItemCode']);
    this.productForm.controls.ItemName.setValue(this.products['ItemName']);
    this.productForm.controls.FechaCreacion.setValue(this.products['FechaCreacion']);
   // this.productForm.controls.FechaVencimiento.setValue(this.products['FechaVencimiento']);
    this.productForm.controls.impuesto.setValue(this.products['impuesto']);
    this.productForm.controls.costo.setValue(this.products['costo']); 
    this.productForm.controls.observaciones.setValue(this.products['observaciones']);
    this.productForm.controls.estado.setValue(this.products['estado']);
    this.productForm.controls.ccomp.setValue(this.products['ccomp']);
   // this.productForm.controls.propiedad.setValue(this.products['propiedad']);
    this.productForm.controls.cbod.setValue(this.products['cbod']);
});

  }

  }

  addProduct(){ 
    const data = this.productForm.getRawValue();


 
 //  data.handle = FuseUtils.handleize(data.cpais);


    this.productsService.addProduct(data);
    this.productsService.addProductExistencia(data)
       .then((res) => {
  
           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Product added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/products']);
       }).catch((err) => {console.log(err); });
       

 }
 // tslint:disable-next-line: typedef
 saveProduct(){
   const data = this.productForm.getRawValue();
   data.handle = FuseUtils.handleize(data.ItemCode);
   console.log(data);

   this.productsService.saveProduct(data)
 //  this.productsService.saveProductExistencia(data)
 this.productsService.addProductExistencia(data)
       .then((res) => {
    
           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Product saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/products']);
       });

 }

 // tslint:disable-next-line: typedef
 getCompany(){
   this.productsService.getAll('/company').subscribe(
     (res) => {
       console.log(res)
this.company = res;
     }
   );
 }

 


  // tslint:disable-next-line: typedef
  getCategorias(){
    this.productsService.getAll('/categorias').subscribe(
     (res) => {
 this.categorias = res;
     }     
     );
  }


 // tslint:disable-next-line: typedef
 getProveedor(){
    this.productsService.getAll('/socios').subscribe(
      (res) => {
 this.proveedor = res; 
      }
    );
  }

  // tslint:disable-next-line: typedef
  getBodega(){
    this.productsService.getAllMio('/bodegas').subscribe(
      (res) => {
 this.bodega = res;
      }
    );
  }


}
