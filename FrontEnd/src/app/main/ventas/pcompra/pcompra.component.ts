import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PComprasService } from '../pcompras/pcompras.service';
import { Order, pcompraDetalle, pcompraEncabezado } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pcompra',
  templateUrl: './pcompra.component.html',
  styleUrls: ['./pcompra.component.scss'],
  encapsulation: ViewEncapsulation.None, 
  animations   : fuseAnimations
})
export class PCompraComponent implements OnInit {
  displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Price', 'Cantidad', 'Descuento', 'Total', 'Bodega', 'actions'];
  ELEMENT_DATA: Element[] = [];
  ELEMENT_VALIDADOR: valida[] = []; 
 formap: validapago[] = [];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  PCompraE: pcompraEncabezado = {};
  PCompraD: pcompraDetalle = {};
  selectedSerie: boolean;
  validaciones = false;
  Ftupdate = true;
  codlista: any;
  docum: any =
      {
          DocNum: ''   
    };
    selectBod: any;
  PCompraForm: FormGroup;
  pageType: any;
  typeDocum: any;
  series: any;
  selectSerie: any;
  selecSerieS: any;
  productosCtrl = new FormControl();
  socioCtrl = new FormControl();
  filteredSocios: Observable < any[] > ;
  filteredProducts: Observable < any[] > ;
  productItem: any;
  socios: any
  //   socios: any[] = [{
//       csocio: null,
//       nombre: null
//   }];
bodegas: any;
//   products: any[] = [{
//       ItemCode: null,
//       ItemName: null
//   }];
products: any;
  Detalle: any;
  statusForm: FormGroup;
  EfectivoForm: FormGroup;
  TarjetaForm: FormGroup;
  ChequeForm: FormGroup;
  TransForm: FormGroup;
  tipoPagos: any;
  order: Order;
  selectTypePago: any;

  private _unsubscribeAll: Subject < any > ;
//   totalpago= 0;
//   saldoVencido= 0;
//   pago: pago = {};
//   tarjeta: tarjeta = {};
//   efectivo: efectivo = {};
//   cheque: cheque = {};
//   transferencia: transferencia = {};
//   numpago: number;
//   payment: any;
//   totapagado= 0;
//   saldo= 0;

  constructor(private pcomprasService: PComprasService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,  
              private _matSnackBar: MatSnackBar,
              private router: Router) {
           

                this.order = new Order();
      // Set the private defaults
                this._unsubscribeAll = new Subject();

                this.PCompraForm = this.createcotizacionForm();
                this.pcomprasService.getAll('/socios').subscribe(
          (res) => {
              this.socios=res;
        //    this.socios[0] = res[0];
        //    this.socios[1] = res[1];
           this.filteredSocios = this.socioCtrl.valueChanges
                  .pipe(
                      startWith(''),
                      map(state => state ? this._filterSocios(state) : this.socios.slice())
                  );
          }
      );

                this.pcomprasService.getAll('/products').subscribe(
          (res) => {
              this.products = res;
            //   this.products[0] = res[0];
            //   this.products[1] = res[1];
              this.filteredProducts = this.productosCtrl.valueChanges
                  .pipe(
                      startWith(''),
                      map(state => state ? this._filterProducts(state) : this.products.slice())
                  );
          }
      );


    //   // Set the private defaults
    //   this._unsubscribeAll = new Subject();

    //   this.PCompraForm = this.createcotizacionForm();
    //   this.pcomprasService.getAll('/socios').subscribe(
    //       (res) => {
    //           this.socios[0] = res[0];
    //           this.socios[1] = res[1];
    //           this.filteredSocios = this.socioCtrl.valueChanges
    //               .pipe(
    //                   startWith(''),
    //                   map(state => state ? this._filterSocios(state) : this.socios.slice())
    //               );
    //       }
    //   );

    //   this.pcomprasService.getAll('/products').subscribe(
    //       (res) => {
    //           this.products = res;
    //         //   this.products[0] = res[0];
    //         //   this.products[1] = res[1];
    //           this.filteredProducts = this.productosCtrl.valueChanges
    //               .pipe(
    //                   startWith(''),
    //                   map(state => state ? this._filterProducts(state) : this.products.slice())
    //               );
    //       }
    //   );
  }

  refreshTable() {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    this.typeDocum = params.tipo;
    if (params.id == 'new') {
        this.PCompraE.fechaDoc=new Date();
        this.PCompraForm.get("fechaDoc").setValue(this.PCompraE.fechaDoc);
    this.getNumerion();
    this.getbodegas();
    this.Ftupdate = true;
    } else
    if (params.id) {
      this.Ftupdate = false;
      this.getNumerion();
      this.getbodegas();
    //   this.getFormapagos();
      let buscarE;
      let buscarD;
      if (params.tipo == 'pcompra'){
          buscarE = '/pcompra/Encabezado';
          buscarD = '/pcompra/Detalle';
         }

      this.pcomprasService.getOne(buscarE, params.id).subscribe(
            (res) => {
               
                this.PCompraE = res[0];
                if (params.tipo != 'pcompra'){
                    this.PCompraE.BaseDocRef=res[0]['tipo'];
                    this.PCompraE.BaseRef=res[0]['numero'];
                    this.PCompraE.numero = '';
                }
                // this.series.cnum=res["Serie"];
                this.PCompraForm = this.createcotizacionForm();
            }
        );
      this.pcomprasService.getOne(buscarD, params.id).subscribe(
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
    
//     this.statusForm = this._formBuilder.group({
//       pagotipo: ['']
//   });
//     this.EfectivoForm = this._formBuilder.group({
//       efectivo: ['']
//   });

//     this.TarjetaForm = this._formBuilder.group({
//       tarjetaNumber: ['', Validators.required],
//       FechaV: ['', Validators.required],
//       Nombre: ['', Validators.required],
//       identidad: ['', Validators.required],
//       totalTarjeta: ['', Validators.required],
//   });

//     this.ChequeForm = this._formBuilder.group({
//       nombreBanco: ['', Validators.required],
//       fecha: ['', Validators.required],
//       numeroCheque: ['', Validators.required],
//       totalCheque: ['', Validators.required],
//   });

//     this.TransForm = this._formBuilder.group({
//       numeroTrans: ['', Validators.required],
//       fecha: ['', Validators.required],
//       totalTrnas: ['', Validators.required],
//   });
 }








//   ngOnInit(): void {

//       const params = this.activatedRoute.snapshot.params;
//       this.pageType = params.id;
//       if (params.id == 'new') {
//       this.getNumerion();
//       this.getbodegas();
//       this.Ftupdate = true;
//       } else
//       if (params.id) {
//         this.Ftupdate = false;
//         this.getNumerion();
//         this.getbodegas();
//         this.pcomprasService.getOne('/pcompra/Encabezado', params.id).subscribe(
//               (res) => {
                 
//                   this.PCompraE = res[0];
//                  // this.series.cnum=res["Serie"];
//                   this.PCompraForm = this.createcotizacionForm();
//               }
//           );
//         this.pcomprasService.getOne('/pcompra/Detalle', params.id).subscribe(
//             (res: any[]) => {
//                 for (let index = 0; index < res.length; index++){
//                     this.ELEMENT_DATA.push({
//                         DocNum: params.id,
//                         Linea: res[index]['Linea'],
//                         itemCode: res[index]['itemCode'],
//                         itemName: res[index]['itemName'],
//                         precio: res[index]['precio'],
//                         cantidad: res[index]['cantidad'],
//                         DescuentoLine: res[index]['DescuentoLine'],
//                         totaLine: res[index]['totaLine'],
//                         almacen: res[index]['almacen'],
//                         impuestocod: 0,
//                     });
//                 }
//                 this.selectedSerie = true;
//                 this.refreshTable();
//                 this.totalGeneral();
//               }
//           )
//       }
//    }

   getNumerion(){
    
    const user = JSON.parse(localStorage.getItem('usuario'));
    this.pcomprasService.getnumeracion('/pcompra/correlativo', user.company, 'Orden Compra').subscribe(
        (res) => {
         //   this.PCompraE.DocNum=res[0]['Correlativo'];
           this.series = res; 
        }
    );
   }


   borrarFila(DocNum: string) {

    if (confirm("Realmente quiere borrarlo?"+DocNum)) {
  
        this.pcomprasService.updatestatusC(DocNum,'C');
  
    //     this.dataSource.splice(cod, 1);
    //   this.tabla1.renderRows();
  
   
   
    }
  
    this.router.navigate(['ventas/pcompras']);
  }


   numerosuc(event){

    const user = JSON.parse(localStorage.getItem('usuario'));
    this.pcomprasService.getOnenumeracion('/pcompra/correlativoOne', user.company, 'Orden Compra', event).subscribe(
        (res1) => {
            this.selectSerie = res1;
 
            this.pcomprasService.getformato('/pcompra/formato', res1[0]['correlativo']).subscribe(
                (res) => {
                    this.selecSerieS = true;
                    this.PCompraE.DocNum = res1[0]['correlativo'];
                    this.PCompraE.numero = res1[0]['prefijo'] + res[0]['Numero'];
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
                        this.ELEMENT_DATA[index]['DocNum'] = this.PCompraE.numero;
                        }

                }
            );
        //   this.series=res; 
        }
       
    );
    this.selectedSerie = true;
   }
  complete(event) {
      this.pcomprasService.getOneSocio('/socios/edit', event.target.value).subscribe(
          (res) => {

            this.PCompraE.SocioCode = event.target.value;
            this.PCompraE.NombreSocio = res[0]['nombre'];
            this.PCompraE.RTN = res[0]['rtn'];
            this.PCompraE.Direccion = res[0]['direccion'];
            this.PCompraE.comentarios = res[0]['observaciones'];
           
            this.PCompraE.SocioCode = event.target.value;
            this.PCompraE.NombreSocio = res[0]['nombre'];
            this.PCompraE.RTN = res[0]['rtn'];
            this.PCompraE.Direccion = res[0]['direccion'];
            this.PCompraE.comentarios = res[0]['observaciones'];
            this.codlista = res[0]['codlista'];
            this.PCompraForm.get('NombreSocio').setValue(this.PCompraE.NombreSocio);
            this.PCompraForm.get('RTN').setValue(this.PCompraE.RTN);
            this.PCompraForm.get('direccion').setValue(this.PCompraE.Direccion);
            this.PCompraForm.get('comentario').setValue(this.PCompraE.comentarios);
     

            //   this.PCompraE.SocioCode = event.target.value;
            //   this.PCompraE.NombreSocio = res[0]['nombre'];
            //   this.PCompraForm.get("NombreSocio").setValue(this.PCompraE.NombreSocio);
          },
          (err) => {
              console.log(err);
          }
      );
  }
  Change(event) {
    //   this.validarExist(event);
      const indice: number = this.ELEMENT_DATA.indexOf(event);
      this.ELEMENT_DATA[indice]['totaLine'] = this.total(event['cantidad'], event['precio'], event['DescuentoLine']);
    //   this.validarExist(event);
      this.refreshTable();
  }

  total(cant: number, precio: number, descuento: number): number {
      return (cant * precio) - (cant * precio) * (descuento / 100);
  }

  totalGeneral(): number{
    let valor = 0;
    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
    valor += this.ELEMENT_DATA[index]['totaLine'];
    }
    return valor;
  }


  isv(): number{
    let valor = 0;
    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
    valor += this.ELEMENT_DATA[index]['totaLine'];
    }
    return 0;
  }

//   isv(): number{
//   let valor = 0;
//   for (let index = 0; index < this.ELEMENT_DATA.length; index++){
//   valor += this.ELEMENT_DATA[index]['totaLine'];
//   }
//   return valor * 0.15;
// }
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
            this.pcomprasService.getInfoComp('/products/infoComp', event.target.value).subscribe(
          (res) => {
            this.Detalle = res[0];
            const index = this.ELEMENT_DATA.length + 1;
            this.ELEMENT_DATA.push({
                DocNum: this.PCompraE.numero,
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
    if (this.Ftupdate == true){
        if ( !this.codlista) {
            this._matSnackBar.open('Debe de seleccionar un cliente', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            this.validaciones = false;
        }else{
            this.validaciones = true;
            this.pcomprasService.getInfoComp('/products/infoComp', this.productItem).subscribe(
        (res) => {
           this.Detalle = res[0];
           const index = this.ELEMENT_DATA.length + 1;
           this.ELEMENT_DATA.push({
                DocNum: this.PCompraE.numero,
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
getbodegas(){
    
    const user = JSON.parse(localStorage.getItem('usuario'));
    const comp = Number(user.company);
    this.pcomprasService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
        (res) => {
this.bodegas = res;
        }
    );
}
// validarExist(eve) {
//     if( eve.tipo=== "I"){
//     let stock = 0;
//     this.pcomprasService.getExistencia('/products/Existencia', eve.itemCode, eve.almacen).subscribe(
//         (res: any[]) => {
//                 if (res.length === 0){
//               this._matSnackBar.open('La bodega no esta asignada al producto seleccionado', 'OK', {
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
//                 if (this.selecSerieS == true){

//                     this.validaciones = true;
//                 }else{
//                     this.validaciones = false;
//                 }
//             }
//         }
//       }
//   );
//     }
// }
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
    this.PCompraE.SocioCode =  this.PCompraForm.get('SocioCode').value;
    this.PCompraE.NombreSocio =  this.PCompraForm.get('NombreSocio').value;

    this.PCompraE.Moneda = 'LPS';
    this.PCompraE.TotalDoc = this.grandTotal();
    this.PCompraE.impuesto = this.isv();
    this.PCompraE.UserCreate = 'dmoncada5';
    this.PCompraE.comentarios = '';
    this.PCompraE.tasa = 0;
    this.PCompraE.vendedor = 1;
    this.PCompraE.Direccion = 'Prueba';
    this.PCompraE.DescPorcentaje = 0;
    this.PCompraE.fechaDoc = this.PCompraForm.get('fechaDoc').value;
    this.PCompraE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // this.PCompraE.fechaDoc=  format(new Date(this.PCompraE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.docum.DocNum = this.PCompraE.DocNum;
    this.PCompraE.tipo = 'ORDENCOMPRA';
 
    this.PCompraE.Serie = this.selectSerie[0]['cnum'];

    this.PCompraE.ccomp = this.selectSerie[0]['ccomp']; 
    this.PCompraE.cai = this.selectSerie[0]['cai']; 
    this.PCompraE.fact_emini = this.selectSerie[0]['fact_emini']; 
    this.PCompraE.fact_emifin = this.selectSerie[0]['fact_emifin']; 
    this.PCompraE.correo = this.selectSerie[0]['correo']; 
    this.PCompraE.fecha_limite = format(new Date(this.selectSerie[0]['fecha_limite']), 'yyyy-MM-dd HH:mm:ss');
    this.PCompraE.RTN = this.PCompraForm.get('RTN').value;
    this.PCompraE.Direccion = this.PCompraForm.get('direccion').value;
    this.PCompraE.comentarios = this.PCompraForm.get('comentario').value;

    const cnum = this.selectSerie[0]['cnum'];
    this.PCompraE.status="A";

    delete this.PCompraE.DocNum;

    // this.guardarValidaciones('Lasagna', (valida: valida[]) => {

     
    //     const validaciones = valida.find(valor => valor.Stock === 'false' ||  valor.Stock === 'BODEGA');
    //     console.log('validaciones',validaciones)
    //     ///////////////////// grabar en tabla//////////////////////////////////
    //     if (!validaciones) {
            this.pcomprasService.addpedidoEncabezado(this.PCompraE).then(respuesta => {

                    // tslint:disable-next-line: prefer-for-of
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

                        this.pcomprasService.addpedidoDetalle(this.ELEMENT_DATA[index]);
                        // tslint:disable-next-line: max-line-length
                        this.pcomprasService.ordenExistencia('/products/ordenExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'], this.ELEMENT_DATA[index]['cantidad']); 
                        
                        // if (this.typeDocum==='cotizacion'){
                        // tslint:disable-next-line: max-line-length
                        //     this.facturaService.setExistencia('/products/setComprometido', this.ELEMENT_DATA[index]["itemCode"], this.ELEMENT_DATA[index]["almacen"], this.ELEMENT_DATA[index]["cantidad"])
                        
                        //    }
                   
                    }
                    if (this.typeDocum === 'cotizacion'){
                        this.pcomprasService.updatestatusC(this.pageType, 'C');
                       }
                    this.pcomprasService.updateCorrelativo(cnum);

                })
                .then(resp => {
                    this._matSnackBar.open('Orden Compra Agregado!', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    // Change the location with new one

                    this.router.navigate(['ventas/pcompras']);
                });
        // } else {
        //     this._matSnackBar.open('Uno de los productos recae en inventario negativo o no existe en bodega!', 'OK', {
        //         verticalPosition: 'top',
        //         duration: 2000
        //     });


        // }

        ///////////////////// FIN grabar en tabla//////////////////////////////////     


    // });
}

//   search = (key, inputArray) => {
//       console.log("inputArray",inputArray,key)
//     for (let i=0; i < inputArray.length; i++) {
//         if (inputArray[i].itemCode === key) {
//             return inputArray[i];
//         }
//     }
// }
guardarValidaciones = (meal, callback) => {
/*
    let stock = 0;

    let contador = 0;
    this.ELEMENT_VALIDADOR = [];
    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {


        this.pcomprasService.getExistencia('/products/Existencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen']).subscribe(
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

*/


let stock = 0;

let contador = 0;
this.ELEMENT_VALIDADOR = [];
// tslint:disable-next-line: prefer-for-of
for (let index = 0; index < this.ELEMENT_DATA.length; index++) {


    this.pcomprasService.ExcExistencia('/products/ExecExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'],this.ELEMENT_DATA[index]['tipo']).subscribe(
        (res: any[]) => {

            if (this.ELEMENT_DATA[index]['tipo']==='I'){
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


    }else{

        if (res.length === 0){
            const line = this.ELEMENT_VALIDADOR.length + 1;
            this.ELEMENT_VALIDADOR.push({
                Linea: line,
                itemCode: this.ELEMENT_DATA[index]['itemCode'].toString(),
                itemName: this.ELEMENT_DATA[index]['itemName'].toString(),
                Stock: 'BODEGA'
            }, );
        
        }else{
            for (let ind = 0; ind < res.length; ind++) {
      
        stock = res[ind]['stock'];


        if (this.ELEMENT_DATA[index]['cantidad']*res[ind]['candpromo'] > stock) {
            const line = this.ELEMENT_VALIDADOR.length + 1;
            this.ELEMENT_VALIDADOR.push({
                Linea: line,
                itemCode: res[ind]['ItemCode'],
                itemName: res[ind]['ItemName'],
                Stock: 'false'
            });
        } else {
            const line = this.ELEMENT_VALIDADOR.length + 1;
            this.ELEMENT_VALIDADOR.push({
                Linea: line,
                itemCode: res[ind]['ItemCode'],
                itemName: res[ind]['ItemName'],
                Stock: 'true'
            });
        }
    }
}

    }









            contador = contador + 1;

            if (contador === this.ELEMENT_DATA.length) {
                callback(this.ELEMENT_VALIDADOR);
            }

        });

}

}


update() {
    this.PCompraE.TotalDoc = this.grandTotal();
    this.PCompraE.impuesto = this.isv();
    this.PCompraE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.PCompraE.fechaDoc = this.PCompraForm.get('fechaDoc').value;
    // this.PCompraE.fechaDoc=   format(new Date(this.PCompraE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.PCompraE.tipo = 'ORDENCOMPRA';
    this.docum.DocNum = this.PCompraE.numero;

    this.PCompraE.fecha_limite = format(new Date(this.PCompraE.fecha_limite), 'yyyy-MM-dd HH:mm:ss');
    this.PCompraE.RTN = this.PCompraForm.get('RTN').value;
    this.PCompraE.Direccion = this.PCompraForm.get('direccion').value;
    this.PCompraE.comentarios = this.PCompraForm.get('comentario').value;




    this.pcomprasService.updatepedidoEncabezado(this.PCompraE).then(respuesta => {


        })
        .then(resp => {
            this._matSnackBar.open('Orden Compra Modificada!', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one

            this.router.navigate(['ventas/pcompras']);
        });


}

createcotizacionForm(): FormGroup {
    return this._formBuilder.group({
        SocioCode: [this.PCompraE.SocioCode, Validators.required],
        NombreSocio: [this.PCompraE.NombreSocio, Validators.required],
        fechaDoc: [this.PCompraE.fechaDoc, Validators.required],
        serie: [this.PCompraE.Serie, Validators.required],
        RTN: [this.PCompraE.RTN],
        comentario: [this.PCompraE.comentarios],
        direccion: [this.PCompraE.Direccion]
    });
}
}

export interface Element {
    // tslint:disable-next-line: max-line-length
    DocNum: string; Linea: number; itemCode: string; itemName: string; precio: number; cantidad: number; DescuentoLine: number; totaLine: number; almacen: number; impuestocod: number; tipo:string
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

export interface validapago {
    tipo: string; activo: string; ejecutar: string;
   }
