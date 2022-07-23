import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NotaCreditosPService } from 'app/main/ventas/notacreditosp/notacreditosp.service';
import { NCPEncabezado, NCPDetalle, Order } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConstantPool } from '@angular/compiler';
import { Console } from 'console';

@Component({
  selector: 'app-notacreditop',
  templateUrl: './notacreditop.component.html',
  styleUrls: ['./notacreditop.component.scss'],
  encapsulation: ViewEncapsulation.None, 
  animations   : fuseAnimations 
})
export class NotaCreditoPComponent implements OnInit {
  displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Price', 'Cantidad', 'Descuento', 'Total', 'Bodega', 'actions'];
  ELEMENT_DATA: Element[] = [];
  ELEMENT_VALIDADOR: valida[] = [];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  NotaCreditoPE: NCPEncabezado = {};
  NotaCreditoD: NCPDetalle = {};
  selectedSerie: boolean;
  validaciones= false;
  Ftupdate= true;
  codlista: any;
  docum: any =
      {
          DocNum: ''   
    };
    selectBod: any;
  NotaCreditoPForm: FormGroup;
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
  socios: any = [{
      csocio: null,
      nombre: null
  }];
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

  constructor(private notacreditopService: NotaCreditosPService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _matSnackBar: MatSnackBar,
              private router: Router) {
           
                this.order = new Order();
      // Set the private defaults
                this._unsubscribeAll = new Subject();

                this.NotaCreditoPForm = this.createNCPForm();
                this.notacreditopService.getAll('/socios').subscribe(
          (res) => {
            this.socios = res;
            //   this.socios[0] = res[0];
            //   this.socios[1] = res[1];
              this.filteredSocios = this.socioCtrl.valueChanges
                  .pipe(
                      startWith(''),
                      map(state => state ? this._filterSocios(state) : this.socios.slice())
                  );
          }
      );

                this.notacreditopService.getAll('/products').subscribe(
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
        this.NotaCreditoPE.fechaDoc=new Date();
        this.NotaCreditoPForm.get("fechaDoc").setValue(this.NotaCreditoPE.fechaDoc);
      this.getNumerion();
      this.getbodegas();
      this.Ftupdate = true;
      } else
      if (params.id) {
        this.Ftupdate = false;
        this.getNumerion();
        this.getbodegas();
        // this.getFormapagos();
        let buscarE;
        let buscarD;
        if (params.tipo == 'notacreditop'){
            buscarE = '/notacreditop/Encabezado';
            buscarD = '/notacreditop/Detalle';
          }

        if (params.tipo =='compra'){
            buscarE = '/compra/EncabezadoB';
            buscarD = '/compra/Detalle';
            this.Ftupdate = true;
          }
        this.notacreditopService.getOne(buscarE, params.id).subscribe(
              (res) => {
               
                this.NotaCreditoPE = res[0];
                if (params.tipo =='compra'){
                    this.NotaCreditoPE.BaseDocRef=res[0]['tipo'];
                    this.NotaCreditoPE.BaseRef=res[0]['numero'];
                    }
                // if (params.tipo != 'notacreditop'){
                //     this.NotaCreditoPE.numero = '';
                // }
                // console.log(res);
                // this.NotaCreditoPE = res[0];
        
                  // this.series.cnum=res["Serie"];
                this.NotaCreditoPForm = this.createNCPForm();
              }
          );
        this.notacreditopService.getOne(buscarD, params.id).subscribe((res: any[]) => {
                for (let index = 0; index < res.length; index++){
                    console.log (buscarD)
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
                    });
                }
                this.selectedSerie = true;
                this.refreshTable();
                this.totalGeneral();
              }
          );
      }
      
    //   this.statusForm = this._formBuilder.group({
    //     pagotipo: ['']
    // });
    //   this.EfectivoForm = this._formBuilder.group({
    //     efectivo: ['']
    // });

    //   this.TarjetaForm = this._formBuilder.group({
    //     tarjetaNumber: ['', Validators.required],
    //     FechaV: ['', Validators.required],
    //     Nombre: ['', Validators.required],
    //     identidad: ['', Validators.required],
    //     totalTarjeta: ['', Validators.required],
    // });

    //   this.ChequeForm = this._formBuilder.group({
    //     nombreBanco: ['', Validators.required],
    //     fecha: ['', Validators.required],
    //     numeroCheque: ['', Validators.required],
    //     totalCheque: ['', Validators.required],
    // });

    //   this.TransForm = this._formBuilder.group({
    //     numeroTrans: ['', Validators.required],
    //     fecha: ['', Validators.required],
    //     totalTrnas: ['', Validators.required],
    // });
   }
getFormapagos(){
    this.notacreditopService.getAll('/formapagos').subscribe(
        (res) => {
         //   this.NotaCreditoPE.DocNum=res[0]['Correlativo'];
           this.tipoPagos = res; 
        }
    );

}
   getNumerion(){
    
    const user = JSON.parse(localStorage.getItem('usuario'));
    this.notacreditopService.getnumeracion('/notacreditop/correlativo', user.company, 'Nota Credito Compras').subscribe(
        (res) => {
         //   this.NotaCreditoPE.DocNum=res[0]['Correlativo'];
           this.series = res; 
        }
    );
   }

    
   numerosuc(event){

    const user = JSON.parse(localStorage.getItem('usuario'));
    this.notacreditopService.getOnenumeracion('/notacreditop/correlativoOne', user.company, 'Nota Credito', event).subscribe(
        (res1) => {
            this.selectSerie = res1;
 
            this.notacreditopService.getformato('/notacreditop/formato', res1[0]['correlativo']).subscribe(
                (res) => {
this.selecSerieS = true;
this.NotaCreditoPE.DocNum = res1[0]['correlativo'];
this.NotaCreditoPE.numero = res1[0]['prefijo'] + res[0]['Numero'];
for (let index = 0; index < this.ELEMENT_DATA.length; index++){
                        this.ELEMENT_DATA[index]['DocNum'] = this.NotaCreditoPE.numero;
                        }
                }
            );
        //   this.series=res; 
        }
       
    );
    this.selectedSerie = true;
   }
  complete(event) {
      this.notacreditopService.getOneSocio('/socios/edit', event.target.value).subscribe(
          (res) => {
              this.NotaCreditoPE.SocioCode = event.target.value;
              this.NotaCreditoPE.NombreSocio = res[0]['nombre'];
              this.NotaCreditoPE.RTN = res[0]['rtn'];
              this.NotaCreditoPE.Direccion = res[0]['direccion'];
              this.NotaCreditoPE.comentarios = res[0]['observaciones'];
             
              this.NotaCreditoPE.SocioCode = event.target.value;
              this.NotaCreditoPE.NombreSocio = res[0]['nombre'];
              this.NotaCreditoPE.RTN = res[0]['rtn'];
              this.NotaCreditoPE.Direccion = res[0]['direccion'];
              this.NotaCreditoPE.comentarios = res[0]['observaciones'];
              this.codlista = res[0]['codlista'];
              this.NotaCreditoPForm.get('NombreSocio').setValue(this.NotaCreditoPE.NombreSocio);
              this.NotaCreditoPForm.get('RTN').setValue(this.NotaCreditoPE.RTN);
              this.NotaCreditoPForm.get('direccion').setValue(this.NotaCreditoPE.Direccion);
              this.NotaCreditoPForm.get('comentario').setValue(this.NotaCreditoPE.comentarios);
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

//   isv(): number{
//   let valor = 0;
//   for (let index = 0; index < this.ELEMENT_DATA.length; index++){
//   valor += this.ELEMENT_DATA[index]['totaLine'];
//   }
//   return valor * 0.15;
// }



isv(): number{
    let valor = 0;
    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
    valor += this.ELEMENT_DATA[index]['totaLine'];
    }
    return 0;
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

      this.notacreditopService.getInfoComp('/products/infoComp', event.target.value).subscribe(
          (res) => {

              this.Detalle = res[0];
              const index = this.ELEMENT_DATA.length + 1;
              this.ELEMENT_DATA.push({
                  DocNum: this.NotaCreditoPE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: 0,
                // precio: this.Detalle.price,
                cantidad: 1,
                DescuentoLine: 0,
                totaLine: this.total(1, 0, 0),
                // totaLine: this.total(1, this.Detalle.price,0),
                almacen: this.Detalle.cbod+"",
                impuestocod: 0,
               // tipo:this.Detalle.tipo,
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
       this.notacreditopService.getInfoComp('/products/infoComp', this.productItem).subscribe(
        (res) => {
           this.Detalle = res[0];
           const index = this.ELEMENT_DATA.length + 1;
           this.ELEMENT_DATA.push({
                DocNum: this.NotaCreditoPE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: 0,
                // precio: this.Detalle.price,
                cantidad: 1,
                DescuentoLine: 0,
                totaLine: this.total(1, 0, 0),
                // totaLine: this.total(1, this.Detalle.price,0),
                almacen: this.Detalle.cbod+"",
                impuestocod: 0,
                //tipo:this.Detalle.tipo,
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
    this.notacreditopService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
        (res) => {
this.bodegas = res;
        }
    );
}
// validarExist(eve) {
//     let stock = 0;
//     this.notacreditopService.getExistencia('/products/Existencia', eve.itemCode, eve.almacen).subscribe(
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
//           }
//         }
//     );
// }
  actions(event) {
      const indice: number = this.ELEMENT_DATA.indexOf(event);
      this.ELEMENT_DATA.splice(indice, 1);
      for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
          this.ELEMENT_DATA[index]['Linea'] = index + 1;
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
    this.NotaCreditoPE.SocioCode =  this.NotaCreditoPForm.get('SocioCode').value;
    this.NotaCreditoPE.NombreSocio =  this.NotaCreditoPForm.get('NombreSocio').value;
    this.NotaCreditoPE.Moneda = 'LPS';
    this.NotaCreditoPE.TotalDoc = this.grandTotal();
    this.NotaCreditoPE.impuesto = this.isv();
    this.NotaCreditoPE.UserCreate = 'dmoncada5';
    this.NotaCreditoPE.comentarios = '';
    this.NotaCreditoPE.tasa = 0;
    this.NotaCreditoPE.vendedor = 1;

    this.NotaCreditoPE.DescPorcentaje = 0;
    this.NotaCreditoPE.fechaDoc = this.NotaCreditoPForm.get('fechaDoc').value;
    this.NotaCreditoPE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // this.NotaCreditoPE.fechaDoc=  format(new Date(this.NotaCreditoPE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.docum.DocNum = this.NotaCreditoPE.DocNum;
    this.NotaCreditoPE.tipo = 'NOTACREDITOCOMPRA';
    this.NotaCreditoPE.Serie = this.selectSerie[0]['cnum'];

    this.NotaCreditoPE.ccomp = this.selectSerie[0]['ccomp']; 
    this.NotaCreditoPE.cai = this.selectSerie[0]['cai']; 
    this.NotaCreditoPE.fact_emini = this.selectSerie[0]['fact_emini']; 
    this.NotaCreditoPE.fact_emifin = this.selectSerie[0]['fact_emifin']; 
    this.NotaCreditoPE.correo = this.selectSerie[0]['correo']; 
    this.NotaCreditoPE.fecha_limite = format(new Date(this.selectSerie[0]['fecha_limite']), 'yyyy-MM-dd HH:mm:ss');
    this.NotaCreditoPE.RTN = this.NotaCreditoPForm.get('RTN').value;
    this.NotaCreditoPE.Direccion = this.NotaCreditoPForm.get('direccion').value;
    this.NotaCreditoPE.comentarios = this.NotaCreditoPForm.get('comentario').value;
    const cnum = this.selectSerie[0]['cnum'];
    delete this.NotaCreditoPE.DocNum;

    // this.guardarValidaciones('Lasagna', (valida: valida[]) => {

     
    //     const validaciones = valida.find(valor => valor.Stock === 'false' ||  valor.Stock === 'BODEGA');

    //     ///////////////////// grabar en tabla//////////////////////////////////
    //     if (!validaciones) {
            this.notacreditopService.addnotacreditoEncabezado(this.NotaCreditoPE).then(respuesta => {

                    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

                        this.notacreditopService.addnotacreditoDetalle(this.ELEMENT_DATA[index]);
                        // tslint:disable-next-line: max-line-length
                        this.notacreditopService.setExistencia('/products/setExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'], this.ELEMENT_DATA[index]['cantidad']);

                    }
                    if (this.typeDocum === 'compra'){
                        this.notacreditopService.updatestatusC(this.pageType, 'C');
                       }
                    this.notacreditopService.updateCorrelativo(cnum);

                })
                .then(resp => {
                    this._matSnackBar.open('Nota de Credito  Agregada!', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    // Change the location with new one

                    this.router.navigate(['ventas/notacreditosp']);
                });
    //     } else {
    //         this._matSnackBar.open('Uno de los productos recae en inventario negativo o no existe en bodega!', 'OK', {
    //             verticalPosition: 'top',
    //             duration: 2000
    //         });


    //     }

    //     ///////////////////// FIN grabar en tabla//////////////////////////////////     


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

    let stock = 0;

    let contador = 0;
    this.ELEMENT_VALIDADOR = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {


        this.notacreditopService.getExistencia('/products/Existencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen']).subscribe(
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


update() {
    this.NotaCreditoPE.TotalDoc = this.grandTotal();
    this.NotaCreditoPE.impuesto = this.isv();
    this.NotaCreditoPE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.NotaCreditoPE.fechaDoc = this.NotaCreditoPForm.get('fechaDoc').value;
    // this.NotaCreditoPE.fechaDoc=   format(new Date(this.NotaCreditoPE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.NotaCreditoPE.tipo = 'NOTACREDITO';
    this.docum.DocNum = this.NotaCreditoPE.numero;

    this.NotaCreditoPE.fecha_limite = format(new Date(this.NotaCreditoPE.fecha_limite), 'yyyy-MM-dd HH:mm:ss');
    this.NotaCreditoPE.RTN = this.NotaCreditoPForm.get('RTN').value;
    this.NotaCreditoPE.Direccion = this.NotaCreditoPForm.get('direccion').value;
    this.NotaCreditoPE.comentarios = this.NotaCreditoPForm.get('comentario').value;



    this.notacreditopService.updatenotacreditoEncabezado(this.NotaCreditoPE).then(respuesta => {


        })
        .then(resp => {
            this._matSnackBar.open('NotaCredito Modificada!', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one

            this.router.navigate(['ventas/notacreditosp']);
        });


}
updateStatus(): void
{
    // const newStatusId = Number.parseInt(this.statusForm.get('pagotipo').value);
   this. selectTypePago = this.statusForm.get('pagotipo').value;


    // if ( !newStatusId )
    // {
    //     return;
    // }

    //  const newStatus = this.tipoPagos.find((status) => {
    //     return status.id === newStatusId;
    // });

    // newStatus['date'] = new Date().toString();

    // this.order.status.unshift(newStatus);
}

createNCPForm(): FormGroup {
    return this._formBuilder.group({
        SocioCode: [this.NotaCreditoPE.SocioCode, Validators.required],
        NombreSocio: [this.NotaCreditoPE.NombreSocio, Validators.required],
        fechaDoc: [this.NotaCreditoPE.fechaDoc, Validators.required],
        serie: [this.NotaCreditoPE.Serie, Validators.required],
        RTN: [this.NotaCreditoPE.RTN],
       comentario: [this.NotaCreditoPE.comentarios],
         direccion: [this.NotaCreditoPE.Direccion]
    });
}
}

export interface Element {
    DocNum: string; Linea: number; itemCode: string; itemName: string; precio: number; cantidad: number; DescuentoLine: number; totaLine: number; almacen: string; impuestocod: number;
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
