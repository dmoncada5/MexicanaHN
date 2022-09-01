import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PromosService } from '../promos/promos.service';
import { Order, promoDetalle, promoEncabezado } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StringIterator } from 'lodash';
import { MatCalendarBody } from '@angular/material/datepicker';


@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
  encapsulation: ViewEncapsulation.None, 
  animations   : fuseAnimations
})
export class PromoComponent implements OnInit {

    displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Cantidad','Bodega', 'actions'];
    ELEMENT_DATA: Element[] = [];
    Ftupdate = true;
   //  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
    PromoE: promoEncabezado = {};
    PromoD: promoDetalle = {};
    PromoForm: FormGroup;
    promo: any;
  //   filteredProducts: any;
   filteredProducts: Observable < any[] > ;
    productosCtrl = new FormControl();
    products: any;
    order: Order;
    Detalle: any;
    productItem: any;
    pageType: any;
    bodegas: any;
    //validaciones:boolean=false;
    private _unsubscribeAll: Subject < any > ;
    company: any = [{
        ccomp:null,
        empresa:null
}];
    codlista: any;
  
  
  
  
    constructor(private promoService: PromosService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,  
              private _matSnackBar: MatSnackBar,
              private router: Router) {

                this.order = new Order();
                // Set the private defaults
                          this._unsubscribeAll = new Subject();

                          this.PromoForm = this.createPromoForm();


                          
                // this.promoService.getAll('/products').subscribe(
                this.promoService.getAll('/promo/NPromo').subscribe(
                    (res) => {
                        this.products = res;
          
                        this.filteredProducts = this.productosCtrl.valueChanges
                            .pipe(
                                startWith(''),
                                map(state => state ? this._filterProducts(state) : this.products.slice())
                            );
                    }
                );
          
      this.getCompany();
      this.getbodegas();
     
  }

  refreshTable() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
}
getbodegas(){
    
  const user = JSON.parse(localStorage.getItem('usuario'));
  const comp = Number(user.company);
  this.promoService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
      (res) => {
this.bodegas = res;
console.log(this.bodegas)
      }
  );
}

  ngOnInit(): void {
    this.getCompany();
    this.getbodegas();
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
 

    
    if (params.id == 'new') {


      this.getCompany();
        this.getbodegas();

        let user=JSON.parse(localStorage.getItem('usuario'));
        // let user=JSON.parse(localStorage.getItem('usuario'));
        // this.PromoForm.controls.ccomp.setValue(parseInt(user.company));  
        this.Ftupdate = true;
        this.PromoForm.controls.ccomp.setValue(parseInt(user.company));
      
        this.PromoE.FechaCreacion =new Date();
        this.PromoForm.get("FechaCreacion").setValue(this.PromoE.FechaCreacion);
       
        } else
        if (params.id) {
          this.getCompany();
          this.getbodegas();
          
       //   let user=JSON.parse(localStorage.getItem('usuario'));
       let user=JSON.parse(localStorage.getItem('usuario'));
       this.PromoForm.controls.ccomp.setValue(parseInt(user.company));
          this.Ftupdate = false;
        //   this.getFormapagos();
          let buscarE;
          let buscarD;
          if (params.tipo == 'promo'){
            this.getCompany();
           let user=JSON.parse(localStorage.getItem('usuario'));
           this.PromoForm.controls.ccomp.setValue(parseInt(user.company));
              buscarE = '/promo/Encabezado';
              buscarD = '/promo/Detalle';
             }
             //llena la informacion basica 
             this.promoService.getOne(buscarE, params.id).subscribe(
                (res) => {
                    
                    this.PromoE = res[0];

                    this.PromoE.ItemCode = res[0]['ItemCode'];
                    this.PromoE.ItemName = res[0]['ItemName'];
                    this.PromoE.FechaCreacion = res[0]['FechaCreacion'];
                    this.PromoE.impuesto = res[0]['impuesto'];
                    this.PromoE.observaciones = res[0]['observaciones'];
                    this.PromoE.estado = res[0]['estado'];
                    this.PromoE.ccomp = res[0]['ccomp'];
                    this.PromoE.costo = res[0]['costo'];
                    this.PromoForm = this.createPromoForm();
                }
            );

             //llena los productos 
          this.promoService.getOne(buscarD, params.id).subscribe(
              (res: any[]) => {
                  for (let index = 0; index < res.length; index++){
                      this.ELEMENT_DATA.push({
                          DocNum: params.id,
                          Linea: res[index]['Linea'],
                          itemCode: res[index]['itemCode'],
                          itemName: res[index]['itemName'],
                          cantidad: res[index]['cantidad'],
                          cbod: res[index]['cbod']
                      
                      });
                  }

                  this.refreshTable();

                }
            );
        }


 }

//completar la informacion basica  
//  complete(event) {
//     this.promoService.getOneSocio('/promo/promo', event.target.value).subscribe(
//         (res) => {

          
//           this.PromoE.ItemCode = res[0]['ItemCode'];
//           this.PromoE.ItemName = res[0]['ItemName'];
//           this.PromoE.FechaCreacion = res[0]['FechaCreacion'];
//           this.PromoE.impuesto = res[0]['impuesto'];
//           this.PromoE.observaciones = res[0]['observaciones'];
//           this.PromoE.estado = res[0]['estado'];
//           this.PromoE.estado = res[0]['costo'];
         
//           this.PromoE.ItemCode = res[0]['ItemCode'];
//           this.PromoE.ItemName = res[0]['ItemName'];
//           this.PromoE.FechaCreacion = res[0]['FechaCreacion'];
//           this.PromoE.impuesto = res[0]['impuesto'];
//           this.PromoE.observaciones = res[0]['observaciones'];
//           this.PromoE.estado = res[0]['estado'];
//           this.PromoE.costo = res[0]['costo'];
//           this.PromoForm.get('ItemCode').setValue(this.PromoE.ItemCode);
//           this.PromoForm.get('ItemName').setValue(this.PromoE.ItemName);
//           this.PromoForm.get('FechaCreacion').setValue(this.PromoE.FechaCreacion);
//           this.PromoForm.get('impuesto').setValue(this.PromoE.impuesto);
//           this.PromoForm.get('observaciones').setValue(this.PromoE.observaciones);
//           this.PromoForm.get('estado').setValue(this.PromoE.estado);
//           this.PromoForm.get('costo').setValue(this.PromoE.costo);

//           //   this.PedidoE.SocioCode = event.target.value;
//           //   this.PedidoE.NombreSocio = res[0]['nombre'];
//           //   this.PedidoForm.get("NombreSocio").setValue(this.PedidoE.NombreSocio);
//         },
//         (err) => {
//             console.log(err);
//         }
//     );
// }


 //completar producto

 completeProducts(event) {
    this.PromoE.DocNum = this.PromoForm.get('ItemCode').value;
    if (this.Ftupdate == true){
   
          
            this.promoService.getInfo('/promo/info', event.target.value).subscribe(
          (res) => {
              this.Detalle = res[0];
              const index = this.ELEMENT_DATA.length + 1;
              this.ELEMENT_DATA.push({
                DocNum: this.PromoE.DocNum,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                cantidad: 1,    
                cbod: this.Detalle.cbod
   
           

              });
              this.refreshTable();
            },
          (err) => {
              console.log(err);
          }
        
            );}
            
  }


 private _filterProducts(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(option => option.ItemName.toLowerCase().includes(filterValue));
}

Change(event) {

    const indice: number = this.ELEMENT_DATA.indexOf(event);
 
    this.refreshTable();
}


// actions(event) {
//     const indice: number = this.ELEMENT_DATA.indexOf(event);
//     this.ELEMENT_DATA.splice(indice, 1);
//     for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
//         this.ELEMENT_DATA[index]['Linea'] = index + 1;
//     }
//   //  if (this.ELEMENT_DATA.length === 0){

//  // }
//     this.refreshTable();
//   }
actions(event) {
  const indice: number = this.ELEMENT_DATA.indexOf(event);
  this.ELEMENT_DATA.splice(indice, 1);
  for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
      this.ELEMENT_DATA[index]['Linea'] = index + 1;
  }
  if (this.ELEMENT_DATA.length === 0){
   // this.validaciones = false;
}
  this.refreshTable();
}

  getCompany(){
    this.promoService.getAll('/company').subscribe(
      (res) => {
        console.log(res)
 this.company = res;
      }
    );
  }
 

  Agregar(event){
    //if (this.Ftupdate == true){
        this.PromoE.DocNum = this.PromoForm.get('ItemCode').value;

            this.promoService.getInfoP('/promo/info', this.productItem).subscribe(
        (res) => {
           this.Detalle = res[0];
           const index = this.ELEMENT_DATA.length + 1;
           this.ELEMENT_DATA.push({
                DocNum: this.PromoE.DocNum,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                cantidad: 1,
                cbod: this.Detalle.cbod

            });
       // console.log(DocNum);
           this.productItem = null;
           this.refreshTable();
        },
        (err) => {
            console.log(err);
        }
    );
   // }
  }


 
  save() {
    this.PromoE.ItemCode =  this.PromoForm.get('ItemCode').value;
    this.PromoE.ItemName =  this.PromoForm.get('ItemName').value;
    this.PromoE.FechaCreacion = this.PromoForm.get('FechaCreacion').value;
    this.PromoE.impuesto = this.PromoForm.get('impuesto').value;
    this.PromoE.observaciones = this.PromoForm.get('observaciones').value;
    this.PromoE.estado = this.PromoForm.get('estado').value;
    this.PromoE.ccomp = this.PromoForm.get('ccomp').value;
    this.PromoE.costo = this.PromoForm.get('costo').value;
    delete this.PromoE.DocNum;


            this.promoService.addpromoEncabezado(this.PromoE).then(respuesta => {

                    // tslint:disable-next-line: prefer-for-of
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

                        this.promoService.addpromoDetalle(this.ELEMENT_DATA[index]);
 
                   
                    }


                    this.promoService.addProductPriceList(this.PromoE);

                })
                .then(resp => {
                    this._matSnackBar.open('Entrega Agregada!', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    // Change the location with new one

                    this.router.navigate(['ventas/promos']);
                });


}



update() {


  const params = this.activatedRoute.snapshot.params;
  this.pageType = params.id;

    this.PromoE.ItemCode =  this.PromoForm.get('ItemCode').value;
    this.PromoE.ItemName =  this.PromoForm.get('ItemName').value;
    this.PromoE.FechaCreacion = this.PromoForm.get('FechaCreacion').value;
    this.PromoE.impuesto = this.PromoForm.get('impuesto').value;
    this.PromoE.observaciones = this.PromoForm.get('observaciones').value;
    this.PromoE.estado = this.PromoForm.get('estado').value;
    this.PromoE.costo = this.PromoForm.get('costo').value;


    // 
    //     for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

    //         this.promoService.updatepromoDetalle(this.ELEMENT_DATA[index]);

       
    //     }
       
    //     })

    this.promoService.updatepromoEncabezado(this.PromoE).then(respuesta => {
      this.promoService.DeletepromoDetalle(params.id);
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

         
        this.promoService.addpromoDetalle(this.ELEMENT_DATA[index]);
     
      }
      this.promoService.updateProductPriceList(this.PromoE);


  })
        .then(resp => {
            this._matSnackBar.open('Promo Modificada!', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one

            this.router.navigate(['ventas/promos']);
        });


}





createPromoForm(): FormGroup {
    return this._formBuilder.group({
        ccomp: [this.PromoE.ccomp, Validators.required],
        ItemCode: [this.PromoE.ItemCode, Validators.required],
        ItemName: [this.PromoE.ItemName, Validators.required],
        FechaCreacion: [this.PromoE.FechaCreacion, Validators.required],
        impuesto: [this.PromoE.impuesto, Validators.required],
        observaciones: [this.PromoE.observaciones],
        estado: [this.PromoE.estado],
        costo: [this.PromoE.costo]
    });
}


}





export interface Element {
    // tslint:disable-next-line: max-line-length
    DocNum: string; Linea: number; itemCode: string; itemName: string;cantidad: number; cbod: number
}