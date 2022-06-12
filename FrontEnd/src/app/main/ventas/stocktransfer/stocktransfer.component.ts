import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ComprasService } from '../compras/compras.service';
import { compraDetalle, compraEncabezado } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-stocktransfer',
    templateUrl: './stocktransfer.component.html',
    styleUrls: ['./stocktransfer.component.scss'],
    encapsulation: ViewEncapsulation.None, 
    animations   : fuseAnimations
})
export class StockTransferComponent implements OnInit {
  displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Price', 'Cantidad', 'Descuento', 'Total', 'Bodega', 'actions'];
  ELEMENT_DATA: Element[] = [];
  ELEMENT_VALIDADOR: valida[] = [];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  compraE: compraEncabezado = {};
  compraD: compraDetalle = {};
  selectedSerie: boolean;
  validaciones= false;
  Ftupdate= true;
  codlista: any;
  docum: any =
      {
          DocNum: ''   
    };
  
  CompraForm: FormGroup;
  pageType: any;
  typeDocum: any;
  
  series: any;
  selectSerie: any;
  selecSerieS: any;
  selectBod: any;
  productosCtrl = new FormControl();
  socioCtrl = new FormControl();
  filteredSocios: Observable < any[] > ;
  filteredProducts: Observable < any[] > ;
  productItem: any;
  socios: any;
//   socios: any[] = [{
//       csocio: null,
//       nombre: null
//   }];
  bodegas: any;
  products: any;
  Detalle: any;

  private _unsubscribeAll: Subject < any > ;

  constructor(private ComprasService: ComprasService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _matSnackBar: MatSnackBar,
              private router: Router) {


      // Set the private defaults
      this._unsubscribeAll = new Subject();

      this.CompraForm = this.createcompraForm();
      this.ComprasService.getAll('/socios').subscribe(
          (res) => {
              this.socios=res;
            //   this.socios[0] = res[0];
            //   this.socios[1] = res[1];
              this.filteredSocios = this.socioCtrl.valueChanges
                  .pipe(
                      startWith(''),
                      map(state => state ? this._filterSocios(state) : this.socios.slice())
                  );
          }
      );

      this.ComprasService.getAll('/products').subscribe(
          (res) => {
            //   this.products[0] = res[0];
            //   this.products[1] = res[1];
            this.products = res;
            this.filteredProducts = this.productosCtrl.valueChanges
                  .pipe(
                      startWith(''),
                      map(state => state ? this._filterProducts(state) : this.products.slice())
                  );
          }
      );

      this.compraE.fechaDoc = new Date();
  }

  refreshTable() {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
      const params = this.activatedRoute.snapshot.params;
      this.pageType = params.id;
      this.typeDocum = params.tipo;
      console.log(params.tipo);

      if (params.id == 'new') {
        this.compraE.fechaDoc=new Date();
        this.CompraForm.get("fechaDoc").setValue(this.compraE.fechaDoc);
    
        this.getNumerion();
        this.getbodegas();
        this.Ftupdate = true;
      } else
      if (params.id) {
        this.Ftupdate = false; 
        this.getNumerion();
        this.getbodegas();
        let buscarE: string;
        let buscarD: string;
        if (params.tipo =='compra'){ 
            buscarE = '/compra/EncabezadoB';
            buscarD = '/compra/Detalle';
           // this.Ftupdate = true;
          }
        if (params.tipo == 'ordencompra'){
            buscarE = '/pcompra/Encabezado';
            buscarD = '/pcompra/Detalle';
            this.Ftupdate = true;
          }
          //this.ComprasService.getOne('/compra/Encabezado', params.id).subscribe(
         this.ComprasService.getOne(buscarE, params.id).subscribe(
              (res) => {
                  this.compraE = res[0];
                  if (params.tipo != 'compra'){
                    this.compraE.BaseDocRef=res[0]['tipo'];
                    this.compraE.BaseRef=res[0]['numero'];
                    this.compraE.numero = '';
                }

                  this.CompraForm = this.createcompraForm();

                //   this.ComprasService.getOneSocio('/socios/edit', this.compraE.SocioCode).subscribe(
                //     (res) => {     this.codlista = res[0]['codlista']; });
              }
          );
        this.ComprasService.getOne(buscarD, params.id).subscribe(
        //    this.ComprasService.getOne('/compra/Detalle', params.id).subscribe(
            (res: any[]) => {
                for (let index = 0; index < res.length; index++){
                    this.ELEMENT_DATA.push({
                        DocNum: params.id,
                        Linea: res[index]['Linea'],
                        itemCode: res[index]['itemCode'],
                        itemName: res[index]['itemName'],
                        precio: res[index]['precio'],
                        cantidad: res[index]['cantidad'],
                        DescuentoLine: res[index]['DescuentoLine'],
                        totaLine: res[index]['totaLine'],
                        almacen: res[index]['almacen'],
                        impuestocod: 0,
                        tipo:res[index]['tipo'],
                    });
                }
                this.selectedSerie = true;
                this.validaciones = true;
                this.refreshTable();
                this.totalGeneral();
              }
          );
      }
   }
   getNumerion(){
    
    const user = JSON.parse(localStorage.getItem('usuario'));
    this.ComprasService.getnumeracion('/compra/correlativo', user.company, 'Compras').subscribe(
        (res) => {
         //   this.FacturaE.DocNum=res[0]['Correlativo'];
           this.series = res; 
         
        }
    );
   }
   numerosuc(event){

    const user = JSON.parse(localStorage.getItem('usuario'));
    this.ComprasService.getOnenumeracion('/compra/correlativoOne', user.company, 'Compras', event).subscribe(
        (res1) => {
            this.selectSerie = res1;
 
            this.ComprasService.getformato('/compra/formato', res1[0]['correlativo']).subscribe(
                (res) => {
this.selecSerieS = true;
this.compraE.DocNum = res1[0]['correlativo'];
this.compraE.numero = res1[0]['prefijo'] + res[0]['Numero'];

for (let index = 0; index < this.ELEMENT_DATA.length; index++){
                        this.ELEMENT_DATA[index]['DocNum'] = this.compraE.numero;
                        }
                }
            );
        //   this.series=res; 
        }
       
    );
    this.selectedSerie = true;
   }
  complete(event) {
      this.ComprasService.getOneSocio('/socios/edit', event.target.value).subscribe(
          (res) => {
              this.compraE.SocioCode = event.target.value;
              this.compraE.NombreSocio = res[0]['nombre'];
              this.compraE.RTN = res[0]['rtn'];
              this.compraE.Direccion = res[0]['direccion'];
              this.compraE.comentarios = res[0]['observaciones'];
             
              this.compraE.SocioCode = event.target.value;
              this.compraE.NombreSocio = res[0]['nombre'];
              this.compraE.RTN = res[0]['rtn'];
              this.compraE.Direccion = res[0]['direccion'];
              this.compraE.comentarios = res[0]['observaciones'];
              this.codlista = res[0]['codlista'];
              this.CompraForm.get('NombreSocio').setValue(this.compraE.NombreSocio);
              this.CompraForm.get('RTN').setValue(this.compraE.RTN);
              this.CompraForm.get('direccion').setValue(this.compraE.Direccion);
              this.CompraForm.get('comentario').setValue(this.compraE.comentarios);
          },
          (err) => {
              console.log(err);
          }
      );
  }
  Change(event) {
      const indice: number = this.ELEMENT_DATA.indexOf(event);
      this.ELEMENT_DATA[indice]['totaLine'] = this.total(event['cantidad'], event['precio'], event['DescuentoLine']);
    // this.validarExist(event);
      this.refreshTable();
  }

  total(cant: number, precio: number, descuento: number): number {
      return (cant * precio) - (cant * precio) * (descuento / 100);
  }

//   validarExist(eve) {
//     let stock = 0;
//     this.selectBod = true;
//     this.ComprasService.getExistencia('/products/Existencia', eve.itemCode, eve.almacen).subscribe(
//         (res: any[]) => {
//                 if (res.length === 0){
//                     this.validaciones = false;
//                     this._matSnackBar.open('La bodega no esta asignada al producto seleccionado', 'OK', {
//                   verticalPosition: 'top',
//                   duration: 2000
//               });
//             }else{
//             stock = res[0]['stock'];
//             if (eve.cantidad > stock) {
//                 this._matSnackBar.open('la cantidad recae sobre inventario negativo', 'OK', {
//                     verticalPosition: 'top',
//                     duration: 2000
//                 });
//                 this.validaciones = false;
//             } else {
//                 this.validaciones = true;
//             }
//           }
//         }
//     );
// }

  totalGeneral(): number{
    let valor = 0;
    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
    valor += this.ELEMENT_DATA[index]['totaLine'];
    }
    return valor;
  }

  isv(): number{
  const valor = 0;
//   for(let index=0;index<this.ELEMENT_DATA.length;index++){
//   valor+=this.ELEMENT_DATA[index]['totaLine'];
//   }
  return valor;
//   return valor*0.15;
}
  grandTotal(): number{
  let valor = 0;
  valor = this.totalGeneral() + this.isv();
  return valor;
}
  completeProducts(event) {


    if (this.Ftupdate == true){
        if ( !this.codlista) {
            this._matSnackBar.open('Debe de seleccionar un cliente', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            this.validaciones = false;
        }else{
            this.validaciones = true;
            this.ComprasService.getInfoComp('/products/infoComp', event.target.value).subscribe(
          (res) => {
              this.Detalle = res[0];
              const index = this.ELEMENT_DATA.length + 1;
              this.ELEMENT_DATA.push({
                  DocNum: this.compraE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: 0,
                // precio: this.Detalle.price,
                cantidad: 1,
                DescuentoLine: 0,
                totaLine: this.total(1, 0, 0),
                // totaLine: this.total(1, this.Detalle.price,0),
                almacen: 0,
                impuestocod: 0,
                tipo:this.Detalle.tipo,
              });        
              this.productItem = null;
  
              this.refreshTable();
          },
          (err) => {
              console.log(err);
          }
      );
        }
        }
  }
  Agregar(event){
    // if (this.Ftupdate == true){
    //     if ( !this.codlista) {
    //         this._matSnackBar.open('Debe de seleccionar un cliente', 'OK', {
    //             verticalPosition: 'top',
    //             duration: 2000
    //         });
    //         this.validaciones = false;
    //     }else{
       this.ComprasService.getInfoComp('/products/infoComp', this.productItem).subscribe(
        (res) => {
            this.validaciones = true;
            this.Detalle = res[0];
            const index = this.ELEMENT_DATA.length + 1; 
            this.ELEMENT_DATA.push({
                DocNum: this.compraE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: 0,
                // precio: this.Detalle.price,
                cantidad: 1,
                DescuentoLine: 0,
                totaLine: this.total(1, 0, 0),
                // totaLine: this.total(1, this.Detalle.price,0),
                almacen: 0,
                impuestocod: 0,
                tipo:this.Detalle.tipo,
            });
            this.productItem = null;
            this.refreshTable();
        },
        (err) => {
            console.log(err);
        }
    );
    
  }

  getbodegas(){
    
    const user = JSON.parse(localStorage.getItem('usuario'));
    const comp = Number(user.company);
    this.ComprasService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
        (res) => {
this.bodegas = res;
        }
    );
}
  actions(event) {
      const indice: number = this.ELEMENT_DATA.indexOf(event);
      this.ELEMENT_DATA.splice(indice, 1);
      for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
          this.ELEMENT_DATA[index]['Linea'] = index + 1;
      }
      if (this.ELEMENT_DATA.length === 0){
          this.validaciones = false;
      }
      this.refreshTable();
  }

  private _filterSocios(value: string): any[] {
      const filterValue = value.toLowerCase();
      return this.socios.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  private _filterProducts(value: string): any[] {
      const filterValue = value.toLowerCase();
      return this.products.filter(option => option.ItemName.toLowerCase().includes(filterValue));
  }

  save() {

this.compraE.SocioCode =  this.CompraForm.get('SocioCode').value;
this.compraE.NombreSocio =  this.CompraForm.get('NombreSocio').value;
this.compraE.Moneda = 'LPS';
this.compraE.TotalDoc = this.grandTotal();
this.compraE.impuesto = this.isv();
this.compraE.UserCreate = 'dmoncada5';
this.compraE.comentarios = '';
this.compraE.tasa = 0;
this.compraE.vendedor = 1;

this.compraE.DescPorcentaje = 0;
this.compraE.fechaDoc = this.CompraForm.get('fechaDoc').value;
this.compraE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
// this.FacturaE.fechaDoc=  format(new Date(this.FacturaE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
this.docum.DocNum = this.compraE.DocNum;
this.compraE.tipo = 'COMPRA';
this.compraE.Serie = this.selectSerie[0]['cnum'];

this.compraE.ccomp = this.selectSerie[0]['ccomp']; 
this.compraE.cai = this.selectSerie[0]['cai']; 
this.compraE.fact_emini = this.selectSerie[0]['fact_emini']; 
this.compraE.fact_emifin = this.selectSerie[0]['fact_emifin']; 
this.compraE.correo = this.selectSerie[0]['correo']; 
this.compraE.fecha_limite = format(new Date(this.selectSerie[0]['fecha_limite']), 'yyyy-MM-dd HH:mm:ss');
this.compraE.RTN = this.CompraForm.get('RTN').value;
this.compraE.Direccion = this.CompraForm.get('direccion').value;
this.compraE.comentarios = this.CompraForm.get('comentario').value;
const cnum = this.selectSerie[0]['cnum'];
this.compraE.status ='A';

 delete this.compraE.DocNum;

// this.guardarValidaciones('Lasagna', (valida: valida[]) => {

//     let validaciones = valida.find(valor => valor.Stock === "false1" ||  valor.Stock === "BODEGA1")
// })
//     /////////////////////grabar en tabla//////////////////////////////////
//     if (!validaciones) {
//     }else{
//         this._matSnackBar.open('Uno de los productos recae en inventario negativo o no existe en bodega!', 'OK', {
//             verticalPosition: 'top',
//             duration: 2000
//         });
//     }

this.ComprasService.addCompraEncabezado(this.compraE).then(respuesta => {
   
    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
      
        this.ComprasService.addCompraDetalle(this.ELEMENT_DATA[index]);
        // this.ComprasService.setExistencia('/products/setExistencia', this.ELEMENT_DATA[index]["itemCode"], this.ELEMENT_DATA[index]["almacen"], this.ELEMENT_DATA[index]["cantidad"])
        this.ComprasService.comprasExistencia('/products/comprasExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'], this.ELEMENT_DATA[index]['cantidad']); 
                                          
    }
    this.ComprasService.updateCorrelativo(cnum);

 })
 .then(resp => {
    this._matSnackBar.open('Compra Agregada!', 'OK', {
        verticalPosition: 'top',
        duration        : 2000
    });

    // Change the location with new one

    this.router.navigate(['ventas/compras']);
 });
    

  }


  guardarValidaciones = (meal, callback) => {

    let stock = 0;

    let contador = 0;
    this.ELEMENT_VALIDADOR = [];
    // tslint:disable-next-line: prefer-for-of
    
    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {


        this.ComprasService.getExistencia('/products/Existencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen']).subscribe(
            (res: any[]) => {
                if (res.length === 0){
                    const line = this.ELEMENT_VALIDADOR.length + 1;
                    this.ELEMENT_VALIDADOR.push({
                        Linea: line,
                        itemCode: this.ELEMENT_DATA[index]['itemCode'].toString(),
                        itemName: this.ELEMENT_DATA[index]['itemName'].toString(),
                        Stock: 'BODEGA'
                    }, );
                
                }else{
                

                stock = res[0]['stock'];


                if (this.ELEMENT_DATA[index]['cantidad'] > stock) {
                    const line = this.ELEMENT_VALIDADOR.length + 1;
                    this.ELEMENT_VALIDADOR.push({
                        Linea: line,
                        itemCode: this.ELEMENT_DATA[index]['itemCode'].toString(),
                        itemName: this.ELEMENT_DATA[index]['itemName'].toString(),
                        Stock: 'false'
                    }, );
                } else {
                    const line = this.ELEMENT_VALIDADOR.length + 1;
                    this.ELEMENT_VALIDADOR.push({
                        Linea: line,
                        itemCode: this.ELEMENT_DATA[index]['itemCode'].toString(),
                        itemName: this.ELEMENT_DATA[index]['itemName'].toString(),
                        Stock: 'true'
                    });
                }
            }

                contador = contador + 1;

                if (contador === this.ELEMENT_DATA.length) {
                    callback(this.ELEMENT_VALIDADOR);
                }

            });

    }
  }


  update(){

    this.compraE.TotalDoc = this.grandTotal();
    this.compraE.impuesto = this.isv();
    this.compraE.LastUpdate =  format(new Date(), 'yyyy-MM-dd HH:mm:ss');
//  this.compraE.fechaDoc=  new Date(format(new Date(this.compraE.fechaDoc), "yyyy-MM-dd HH:mm:ss"));
    this.compraE.fechaDoc = this.CompraForm.get('fechaDoc').value;
    this.docum.DocNum = this.compraE.numero;
    this.compraE.fecha_limite = format(new Date(this.compraE.fecha_limite), 'yyyy-MM-dd HH:mm:ss');
    this.compraE.RTN = this.CompraForm.get('RTN').value;
    this.compraE.Direccion = this.CompraForm.get('direccion').value;
    this.compraE.comentarios = this.CompraForm.get('comentario').value;

//  let cnum = this.selectSerie[0]["cnum"];

// this.guardarValidaciones('Lasagna', (valida: valida[]) => {

 

//    let validaciones = valida.find(valor => valor.Stock === "false1" ||  valor.Stock === "BODEGA1")
// console.log(validaciones)

// })
//    /////////////////////grabar en tabla//////////////////////////////////
//    if (!validaciones) {
// }else{
//     this._matSnackBar.open('Uno de los productos recae en inventario negativo o no existe en bodega!', 'OK', {
//         verticalPosition: 'top',
//         duration: 2000
//     });
// }

    
    this.ComprasService.updateCompraEncabezado(this.compraE).then(respuesta => {

    this.ComprasService.DeleteCompraDetalle( this.docum.DocNum).subscribe(
        res => {
       for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
  
     const res =  this.ComprasService.addCompraDetalle(this.ELEMENT_DATA[index]);
             
   }
        }
    );
    
  

})
.then(resp => {
   this._matSnackBar.open('Compra Modificada!', 'OK', {
       verticalPosition: 'top',
       duration        : 2000
   });

   // Change the location with new one

   this.router.navigate(['ventas/compras']);
});
   

//  this.ComprasService.updateCompraEncabezado(this.compraE).then(respuesta=>{
   
//     for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
//         console.log(index,this.ELEMENT_DATA[index])
//     this.ComprasService.addCompraDetalle(this.ELEMENT_DATA[index]);
//         }

//  })
//  .then(resp=>{
//     this._matSnackBar.open('Compra Modificada!', 'OK', {
//         verticalPosition: 'top',
//         duration        : 2000
//     });

//     // Change the location with new one

//     this.router.navigate(['ventas/compras']);
//  })


  }

  createcompraForm(): FormGroup {
          return this._formBuilder.group({ 
          SocioCode: [this.compraE.SocioCode, Validators.required],
          NombreSocio: [this.compraE.NombreSocio, Validators.required],
          fechaDoc: [this.compraE.fechaDoc, Validators.required],
          serie: [this.compraE.Serie, Validators.required],
          RTN: [this.compraE.RTN],
         comentario: [this.compraE.comentarios],
           direccion: [this.compraE.Direccion]      
      });
  }
  }

export interface Element {
   DocNum: string; Linea: number; itemCode: string; itemName: string; precio: number; cantidad: number; DescuentoLine: number; totaLine: number;almacen: number;impuestocod: number;tipo: string;
  }
export interface valida {
    Linea: number;
    itemCode: string;
    itemName: string;
    Stock: string;
}

export interface status {
    DocNum: number;
    status: string;
   }
   