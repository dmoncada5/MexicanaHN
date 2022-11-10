import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PedidosService } from '../pedidos/pedidos.service';
import { Order, pedidoDetalle, pedidoEncabezado } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
  encapsulation: ViewEncapsulation.None, 
  animations   : fuseAnimations
})
export class PedidoComponent implements OnInit {
  displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Price', 'Cantidad', 'Descuento', 'Total', 'Bodega', 'actions'];
  ELEMENT_DATA: Element[] = [];
  ELEMENT_VALIDADOR: valida[] = []; 
 formap: validapago[] = [];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  PedidoE: pedidoEncabezado = {};
  PedidoD: pedidoDetalle = {};
  selectedSerie: boolean;
  validaciones = false;
  Ftupdate = true;
  codlista: any;
  entrega=false;
  docum: any =
      {
          DocNum: ''   
    };
    selectBod: any;
  PedidoForm: FormGroup;
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
  socioItem: any;

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

  constructor(private pedidoService: PedidosService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,  
              private _matSnackBar: MatSnackBar,
              private router: Router) {
           

                this.order = new Order();
      // Set the private defaults
                this._unsubscribeAll = new Subject();

                this.PedidoForm = this.createcotizacionForm();
                this.pedidoService.getAll('/socios').subscribe(
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

                this.pedidoService.getAll('/products').subscribe(
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

    //   this.PedidoForm = this.createcotizacionForm();
    //   this.pedidoService.getAll('/socios').subscribe(
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

    //   this.pedidoService.getAll('/products').subscribe(
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
        this.PedidoE.fechaDoc=new Date();
        this.PedidoForm.get("fechaDoc").setValue(this.PedidoE.fechaDoc);
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
      if (params.tipo == 'pedido'){
          buscarE = '/pedido/Encabezado';
          buscarD = '/pedido/Detalle';
         }
      if (params.tipo == 'cotizacion'){
          buscarE = '/cotizacion/Encabezado';
          buscarD = '/cotizacion/Detalle';
          this.Ftupdate = true;
        }
      this.pedidoService.getOne(buscarE, params.id).subscribe(
            (res) => {
               
                this.PedidoE = res[0];
                if (params.tipo != 'pedido'){
                    this.PedidoE.BaseDocRef=res[0]['tipo'];
                    this.PedidoE.BaseRef=res[0]['numero'];
                    this.PedidoE.numero = '';
                }
                // this.series.cnum=res["Serie"];
                this.PedidoForm = this.createcotizacionForm();
            }
        );
      this.pedidoService.getOne(buscarD, params.id).subscribe(
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
//         this.pedidoService.getOne('/pedido/Encabezado', params.id).subscribe(
//               (res) => {
                 
//                   this.PedidoE = res[0];
//                  // this.series.cnum=res["Serie"];
//                   this.PedidoForm = this.createcotizacionForm();
//               }
//           );
//         this.pedidoService.getOne('/pedido/Detalle', params.id).subscribe(
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
    this.pedidoService.getnumeracion('/pedido/correlativo', user.company, 'Pedido').subscribe(
        (res) => {
         //   this.PedidoE.DocNum=res[0]['Correlativo'];
           this.series = res; 
        }
    );
   }


   borrarFila(DocNum: string) {

    if (confirm("Realmente quiere borrarlo?"+DocNum)) {
  
        this.pedidoService.updatestatusC(DocNum,'C');
  
    //     this.dataSource.splice(cod, 1);
    //   this.tabla1.renderRows();
  
   
   
    }
  
    this.router.navigate(['ventas/pedidos']);
  }


   numerosuc(event){

    const user = JSON.parse(localStorage.getItem('usuario'));
    this.pedidoService.getOnenumeracion('/pedido/correlativoOne', user.company, 'Pedido', event).subscribe(
        (res1) => {
            this.selectSerie = res1;
 
            this.pedidoService.getformato('/pedido/formato', res1[0]['correlativo']).subscribe(
                (res) => {
                    this.selecSerieS = true;
                    this.PedidoE.DocNum = res1[0]['correlativo'];
                    this.PedidoE.numero = res1[0]['prefijo'] + res[0]['Numero'];
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
                        this.ELEMENT_DATA[index]['DocNum'] = this.PedidoE.numero;
                        }

                }
            );
        //   this.series=res; 
        }
       
    );
    this.selectedSerie = true;
   }
  complete(event) {
      this.pedidoService.getOneSocio('/socios/edit', event.target.value).subscribe(
          (res) => {

            this.PedidoE.SocioCode = event.target.value;
            this.PedidoE.NombreSocio = res[0]['nombre'];
            this.PedidoE.RTN = res[0]['rtn'];
            this.PedidoE.Direccion = res[0]['direccion'];
            this.PedidoE.comentarios = res[0]['observaciones'];
           
            this.PedidoE.SocioCode = event.target.value;
            this.PedidoE.NombreSocio = res[0]['nombre'];
            this.PedidoE.RTN = res[0]['rtn'];
            this.PedidoE.Direccion = res[0]['direccion'];
            this.PedidoE.comentarios = res[0]['observaciones'];
            this.codlista = res[0]['codlista'];
            this.PedidoForm.get('NombreSocio').setValue(this.PedidoE.NombreSocio);
            this.PedidoForm.get('RTN').setValue(this.PedidoE.RTN);
            this.PedidoForm.get('direccion').setValue(this.PedidoE.Direccion);
            this.PedidoForm.get('comentario').setValue(this.PedidoE.comentarios);
            this.ELEMENT_DATA.length=0;
            this.refreshTable();

            //   this.PedidoE.SocioCode = event.target.value;
            //   this.PedidoE.NombreSocio = res[0]['nombre'];
            //   this.PedidoForm.get("NombreSocio").setValue(this.PedidoE.NombreSocio);
          },
          (err) => {
              console.log(err);
          }
      );
  }
  Change(event) {
      this.validarExist(event);
      const indice: number = this.ELEMENT_DATA.indexOf(event);
      this.ELEMENT_DATA[indice]['totaLine'] = this.total(event['cantidad'], event['precio'], event['DescuentoLine']);
      this.validarExist(event);
      this.refreshTable();
  }

  total(cant: number, precio: number,descuento:number): number {
    let valor=0;
    if(this.entrega){
        valor= (cant * precio)- (cant * precio)*(descuento/100);
        return Number(valor.toFixed(4));
    }
    else{ 
    valor= (cant * precio/1.15)- (cant * precio)*(descuento/100);
    return Number(valor.toFixed(4));
    }

}
//   total(cant: number, precio: number,descuento:number): number {
//     let valor=0;
//     valor= (cant * precio/1.15)- (cant * precio)*(descuento/100);
//     return Number(valor.toFixed(4));
// }


  totalGeneral(): number{
    let valor = 0;
    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
    valor += this.ELEMENT_DATA[index]['totaLine'];
    }
    return valor;
  }

  isv():number{
    let valor=0;
    for(let index=0;index<this.ELEMENT_DATA.length;index++){
   // valor+=(this.ELEMENT_DATA[index]['precio']*this.ELEMENT_DATA[index]['cantidad']);
    valor+=(this.ELEMENT_DATA[index]['totaLine']);
    }
    if(this.entrega){
        return valor=0;
    }
    else {
    return valor*0.15;
  }
}


//   isv():number{
//     let valor=0;
//     for(let index=0;index<this.ELEMENT_DATA.length;index++){
//     valor+=(this.ELEMENT_DATA[index]['totaLine']);//*this.ELEMENT_DATA[index]['cantidad']);
//     }
//     return valor*0.15;
//   }

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
            this.pedidoService.getInfo('/products/info', event.target.value, 1).subscribe(
          (res) => {
              this.Detalle = res[0];
              const index = this.ELEMENT_DATA.length + 1;
              this.ELEMENT_DATA.push({
               DocNum: this.PedidoE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: this.Detalle.price,
                cantidad: 1,
                DescuentoLine: 0,
                totaLine: this.total(1, this.Detalle.price,0),
                almacen: this.Detalle.cbod+"",
                impuestocod: 0,
                tipo:this.Detalle.tipo
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
            this.pedidoService.getInfo('/products/info', this.productItem, this.codlista).subscribe(
        (res) => {
           this.Detalle = res[0];
           const index = this.ELEMENT_DATA.length + 1;
           this.ELEMENT_DATA.push({
                DocNum: this.PedidoE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: this.Detalle.price,
                cantidad: 1,
                DescuentoLine: 0,
                totaLine: this.total(1, this.Detalle.price,0),
                almacen: this.Detalle.cbod+"",
                impuestocod: 0,
                tipo:this.Detalle.tipo
            });
        
           this.productItem = null;
           this.ELEMENT_DATA.reverse();
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
    this.pedidoService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
        (res) => {
this.bodegas = res;
        }
    );
}
validarExist(eve) {
    if( eve.tipo=== "I"){
    let stock = 0;
    this.pedidoService.getExistencia('/products/Existencia', eve.itemCode, eve.almacen).subscribe(
        (res: any[]) => {
                if (res.length === 0){
              this._matSnackBar.open('La bodega no esta asignada al producto seleccionado', 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
              });
            }else{
            stock = res[0]['stock'];
            if (eve.cantidad > stock) {
                this._matSnackBar.open('la cantidad recae sobre inventario negativo', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
                this.validaciones = false;
            } else {
                if (this.selecSerieS == true){

                    this.validaciones = true;
                }else{
                    this.validaciones = false;
                }
            }
        }
      }
  );
    }
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
    this.PedidoE.SocioCode =  this.PedidoForm.get('SocioCode').value;
    this.PedidoE.NombreSocio =  this.PedidoForm.get('NombreSocio').value;

    this.PedidoE.Moneda = 'LPS';
    this.PedidoE.TotalDoc = this.grandTotal();
    this.PedidoE.impuesto = this.isv();

        
let user=JSON.parse(localStorage.getItem('usuario'));
this.PedidoE.UserCreate = user.usuario ;

    this.PedidoE.comentarios = '';
    this.PedidoE.tasa = 0;
    this.PedidoE.vendedor = 1;
    this.PedidoE.Direccion = 'Prueba';
    this.PedidoE.DescPorcentaje = 0;
    this.PedidoE.fechaDoc = this.PedidoForm.get('fechaDoc').value;
    this.PedidoE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // this.PedidoE.fechaDoc=  format(new Date(this.PedidoE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.docum.DocNum = this.PedidoE.DocNum;
    this.PedidoE.tipo = 'PEDIDO';
 
    this.PedidoE.Serie = this.selectSerie[0]['cnum'];

    this.PedidoE.ccomp = this.selectSerie[0]['ccomp']; 
    this.PedidoE.cai = this.selectSerie[0]['cai']; 
    this.PedidoE.fact_emini = this.selectSerie[0]['fact_emini']; 
    this.PedidoE.fact_emifin = this.selectSerie[0]['fact_emifin']; 
    this.PedidoE.correo = this.selectSerie[0]['correo']; 
    this.PedidoE.fecha_limite = format(new Date(this.selectSerie[0]['fecha_limite']), 'yyyy-MM-dd HH:mm:ss');
    this.PedidoE.RTN = this.PedidoForm.get('RTN').value;
    this.PedidoE.Direccion = this.PedidoForm.get('direccion').value;
    this.PedidoE.comentarios = this.PedidoForm.get('comentario').value;

    const cnum = this.selectSerie[0]['cnum'];
    this.PedidoE.status="A";

    delete this.PedidoE.DocNum;

    this.guardarValidaciones('Lasagna', (valida: valida[]) => {

     
        const validaciones = valida.find(valor => valor.Stock === 'false' ||  valor.Stock === 'BODEGA');
        console.log('validaciones',validaciones)
        ///////////////////// grabar en tabla//////////////////////////////////
        if (!validaciones) {
            this.pedidoService.addpedidoEncabezado(this.PedidoE).then(respuesta => {

                    // tslint:disable-next-line: prefer-for-of
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

                        this.pedidoService.addpedidoDetalle(this.ELEMENT_DATA[index]);
                        // tslint:disable-next-line: max-line-length
                        this.pedidoService.pedidoExistencia('/products/pedidoExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'], this.ELEMENT_DATA[index]['cantidad']); 
                        
                        // if (this.typeDocum==='cotizacion'){
                        // tslint:disable-next-line: max-line-length
                        //     this.facturaService.setExistencia('/products/setComprometido', this.ELEMENT_DATA[index]["itemCode"], this.ELEMENT_DATA[index]["almacen"], this.ELEMENT_DATA[index]["cantidad"])
                        
                        //    }
                   
                    }
                    if (this.typeDocum === 'cotizacion'){
                        this.pedidoService.updatestatusC(this.pageType, 'C');
                       }
                    this.pedidoService.updateCorrelativo(cnum);

                })
                .then(resp => {
                    this._matSnackBar.open('Pedido Agregado!', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    // Change the location with new one

                    this.router.navigate(['ventas/pedidos']);
                });
        } else {
            this._matSnackBar.open('Uno de los productos recae en inventario negativo o no existe en bodega!', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });


        }

        ///////////////////// FIN grabar en tabla//////////////////////////////////     


    });
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


        this.pedidoService.getExistencia('/products/Existencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen']).subscribe(
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


    this.pedidoService.ExcExistencia('/products/ExecExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'],this.ELEMENT_DATA[index]['tipo']).subscribe(
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
    this.PedidoE.TotalDoc = this.grandTotal();
    this.PedidoE.impuesto = this.isv();
    this.PedidoE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.PedidoE.fechaDoc = this.PedidoForm.get('fechaDoc').value;
    // this.PedidoE.fechaDoc=   format(new Date(this.PedidoE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.PedidoE.tipo = 'PEDIDO';
    this.docum.DocNum = this.PedidoE.numero;

    this.PedidoE.fecha_limite = format(new Date(this.PedidoE.fecha_limite), 'yyyy-MM-dd HH:mm:ss');
    this.PedidoE.RTN = this.PedidoForm.get('RTN').value;
    this.PedidoE.Direccion = this.PedidoForm.get('direccion').value;
    this.PedidoE.comentarios = this.PedidoForm.get('comentario').value;




    this.pedidoService.updatepedidoEncabezado(this.PedidoE).then(respuesta => {


        })
        .then(resp => {
            this._matSnackBar.open('Pedido Modificada!', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one

            this.router.navigate(['ventas/pedidos']);
        });


}

createcotizacionForm(): FormGroup {
    return this._formBuilder.group({
        SocioCode: [this.PedidoE.SocioCode, Validators.required],
        NombreSocio: [this.PedidoE.NombreSocio, Validators.required],
        fechaDoc: [this.PedidoE.fechaDoc, Validators.required],
        serie: [this.PedidoE.Serie, Validators.required],
        RTN: [this.PedidoE.RTN],
        comentario: [this.PedidoE.comentarios],
        direccion: [this.PedidoE.Direccion]
    });
}
}

export interface Element {
    // tslint:disable-next-line: max-line-length
    DocNum: string; Linea: number; itemCode: string; itemName: string; precio: number; cantidad: number; DescuentoLine: number; totaLine: number; almacen: string; impuestocod: number; tipo:string
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
