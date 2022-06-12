import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ProductosService } from '../productos/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ProductoComponent implements OnInit {
    productos: any = {
    cprod : null,
    ccomp : null,
    ccate : null,
    clbod : null,
    cprov : null, 
    producto : null,
    costo : null,
    tipo : null,
    compratipounidad : null,
    ventatipounidad : null,
    impuesto : null,
    sinexistencia : null,    
    fechaingreso : null,
    fechavenc : null,
    observaciones : null,
    serieprod : null,
    estado : null,     
    imagen : null
    };

    pageType: string;
    productoForm: FormGroup;
    company: any = [];
    lbodega: any = [];
    sucursal: any = [];
    categorias: any = [];
    proveedor: any = [];
    constructor(private productosService: ProductosService, 
                private activatedRoute: ActivatedRoute,
                private _formBuilder: FormBuilder,
                private _matSnackBar: MatSnackBar,
                private router: Router) {
this.productoForm = _formBuilder.group({
  // cpais: ['',],
  // pais: ['', Validators.required],
  // estado: ['', Validators.required]

  cprod : ['', ],
  ccomp : ['', Validators.required],
  ccate : ['', Validators.required],
  clbod : ['', Validators.required],
  cprov : ['', Validators.required], 
  producto : ['', Validators.required],
  costo : ['', Validators.required],
  tipo : ['', Validators.required],
  compratipounidad : ['', Validators.required],
  ventatipounidad : ['', Validators.required],
  impuesto : ['', Validators.required],
  sinexistencia : ['', Validators.required],    
  fechaingreso : ['', Validators.required],
  fechavenc : ['', Validators.required],
  observaciones : ['', Validators.required],
  serieprod : ['', Validators.required],
  estado : ['', Validators.required],     
  imagen : ['', Validators.required],
});
}
 
  ngOnInit(): void {
    this.getCompany();
    this.getLBodega();
     // tslint:disable-next-line: align
    this.getProveedor();
    this.getCategorias();
 
    // this.getSucursal();
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

}else
  if (params.id) {
this.productosService.getProductoOne('/productos/edit/', params.id).subscribe(
(res) => {
this.productos = res[0];
this.productoForm.controls.cprod.setValue(this.productos['cprod']);
this.productoForm.controls.ccomp.setValue(this.productos['ccomp']);
this.productoForm.controls.ccate.setValue(this.productos['ccate']);
this.productoForm.controls.clbod.setValue(this.productos['clbod']);
this.productoForm.controls.cprov.setValue(this.productos['cprov']); 
this.productoForm.controls.producto.setValue(this.productos['producto']);
this.productoForm.controls.costo.setValue(this.productos['costo']);
this.productoForm.controls.tipo.setValue(this.productos['tipo']);
this.productoForm.controls.compratipounidad.setValue(this.productos['compratipounidad']);
this.productoForm.controls.ventatipounidad.setValue(this.productos['ventatipounidad']);
this.productoForm.controls.impuesto.setValue(this.productos['impuesto']);
this.productoForm.controls.sinexistencia.setValue(this.productos['sinexistencia']);    
this.productoForm.controls.fechaingreso.setValue(this.productos['fechaingreso']);
this.productoForm.controls.fechavenc.setValue(this.productos['fechavenc']);
this.productoForm.controls.observaciones.setValue(this.productos['observaciones']);
this.productoForm.controls.serieprod.setValue(this.productos['serieprod']);
this.productoForm.controls.estado.setValue(this.productos['estado']);     
this.productoForm.controls.imagen.setValue(this.productos['imagen']);
  
});

  }

  }

  addProducto(){ 
    const data = this.productoForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.productosService.addProducto(data)
       .then((res) => {
 
           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Product added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/productos']);
       }).catch((err) => {console.log(err); });
       

 }
 saveProducto(){
   const data = this.productoForm.getRawValue();
   data.handle = FuseUtils.handleize(data.csuc);


   this.productosService.saveProducto(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Product saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/prodcutos']);
       });

 }

 // tslint:disable-next-line: typedef
 getCompany(){
   this.productosService.getAll('/company').subscribe(
     (res) => {
this.company = res;
     }
   );
 }


  // tslint:disable-next-line: typedef
  getLBodega(){
    this.productosService.getAllMio('/lotebodega').subscribe(
      (res) => {
 this.lbodega = res;
      }
    );
  }

  // tslint:disable-next-line: typedef
  getCategorias(){
    this.productosService.getAll('/categorias').subscribe(
     (res) => {
 this.categorias = res;
     }     
     );
  }


 // tslint:disable-next-line: typedef
 getProveedor(){
    this.productosService.getAll('/socios').subscribe(
      (res) => {
 this.proveedor = res; 
      }
    );
  }




}
