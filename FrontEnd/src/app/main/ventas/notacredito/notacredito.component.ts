import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NotaCreditosService } from '../notacreditos/notacreditos.service';
import { notacreditoDetalle, notacreditoEncabezado, Order } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notacredito',
  templateUrl: './notacredito.component.html',
  styleUrls: ['./notacredito.component.scss'],
  encapsulation: ViewEncapsulation.None, 
  animations   : fuseAnimations 
})
export class NotaCreditoComponent implements OnInit {
  displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Price', 'Cantidad', 'Descuento', 'Total', 'Bodega', 'actions'];
  ELEMENT_DATA: Element[] = [];
  ELEMENT_VALIDADOR: valida[] = [];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  NotaCreditoE: notacreditoEncabezado = {};
  NotaCreditoD: notacreditoDetalle = {};
  selectedSerie: boolean;
  validaciones= false;
  Ftupdate= true;
  codlista: any;
  docum: any =
      {
          DocNum: ''   
    };
    selectBod: any;
  NotaCreditoForm: FormGroup;
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
  validarISV:any;
  private _unsubscribeAll: Subject < any > ;

  constructor(private notacreditoService: NotaCreditosService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _matSnackBar: MatSnackBar,
              private router: Router) {
           
                this.order = new Order();
      // Set the private defaults
                this._unsubscribeAll = new Subject();

                this.NotaCreditoForm = this.createfacturaForm();
                this.notacreditoService.getAll('/socios').subscribe(
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

                this.notacreditoService.getAll('/products').subscribe(
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

   
      if (params.id == 'new') {
        this.NotaCreditoE.fechaDoc=new Date();
        this.NotaCreditoForm.get("fechaDoc").setValue(this.NotaCreditoE.fechaDoc);
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
        if (params.tipo == 'notacredito'){
            buscarE = '/notacredito/Encabezado';
            buscarD = '/notacredito/Detalle';
          }

        if (params.tipo =='factura'){
            buscarE = '/factura/EncabezadoB';
            buscarD = '/factura/Detalle';

            this.Ftupdate = true;
            this.validarISV=true;
          }

          if (params.tipo =='entrega'){
            buscarE = '/factura/EncabezadoB';
            buscarD = '/factura/Detalle';
            this.validarISV=false;
            this.Ftupdate = true;
          }

        this.notacreditoService.getOne(buscarE, params.id).subscribe(
              (res) => {
          
                this.NotaCreditoE = res[0];
             
             
                if (params.tipo =='factura'){
                    this.NotaCreditoE.BaseDocRef=res[0]['tipo'];
                    this.NotaCreditoE.BaseRef=res[0]['numero'];
                    }
                    if (params.tipo =='entrega'){
                        this.NotaCreditoE.BaseDocRef=res[0]['tipo'];
                        this.NotaCreditoE.BaseRef=res[0]['numero'];
                        }
                // if (params.tipo != 'notacredito'){
                //     this.NotaCreditoE.numero = '';
                // }
                // console.log(res);
                // this.NotaCreditoE = res[0];
               
                  // this.series.cnum=res["Serie"];
                this.NotaCreditoForm = this.createfacturaForm();
              }
          );
        this.notacreditoService.getOne(buscarD, params.id).subscribe(
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
                    });
                }
                this.selectedSerie = true;
                this.refreshTable();
                this.totalGeneral();
              }
          );
      }
      
      this.statusForm = this._formBuilder.group({
        pagotipo: ['']
    });
      this.EfectivoForm = this._formBuilder.group({
        efectivo: ['']
    });

      this.TarjetaForm = this._formBuilder.group({
        tarjetaNumber: ['', Validators.required],
        FechaV: ['', Validators.required],
        Nombre: ['', Validators.required],
        identidad: ['', Validators.required],
        totalTarjeta: ['', Validators.required],
    });

      this.ChequeForm = this._formBuilder.group({
        nombreBanco: ['', Validators.required],
        fecha: ['', Validators.required],
        numeroCheque: ['', Validators.required],
        totalCheque: ['', Validators.required],
    });

      this.TransForm = this._formBuilder.group({
        numeroTrans: ['', Validators.required],
        fecha: ['', Validators.required],
        totalTrnas: ['', Validators.required],
    });
   }
getFormapagos(){
    this.notacreditoService.getAll('/formapagos').subscribe(
        (res) => {
         //   this.NotaCreditoE.DocNum=res[0]['Correlativo'];
           this.tipoPagos = res; 
        }
    );

}
   getNumerion(){
    
    const user = JSON.parse(localStorage.getItem('usuario'));
    this.notacreditoService.getnumeracion('/notacredito/correlativo', user.company, 'Nota Credito').subscribe(
        (res) => {
         //   this.NotaCreditoE.DocNum=res[0]['Correlativo'];
           this.series = res; 
        }
    );
   }

    
   numerosuc(event){

    const user = JSON.parse(localStorage.getItem('usuario'));
    this.notacreditoService.getOnenumeracion('/notacredito/correlativoOne', user.company, 'Nota Credito', event).subscribe(
        (res1) => {
            this.selectSerie = res1;
 
            this.notacreditoService.getformato('/notacredito/formato', res1[0]['correlativo']).subscribe(
                (res) => {
this.selecSerieS = true;
this.NotaCreditoE.DocNum = res1[0]['correlativo'];
this.NotaCreditoE.numero = res1[0]['prefijo'] + res[0]['Numero'];
for (let index = 0; index < this.ELEMENT_DATA.length; index++){
                        this.ELEMENT_DATA[index]['DocNum'] = this.NotaCreditoE.numero;
                        }
                }
            );
        //   this.series=res; 
        }
       
    );
    this.selectedSerie = true;
   }
  complete(event) {
      this.notacreditoService.getOneSocio('/socios/edit', event.target.value).subscribe(
          (res) => {
              this.NotaCreditoE.SocioCode = event.target.value;
              this.NotaCreditoE.NombreSocio = res[0]['nombre'];
              this.NotaCreditoE.RTN = res[0]['rtn'];
              this.NotaCreditoE.Direccion = res[0]['direccion'];
              this.NotaCreditoE.comentarios = res[0]['observaciones'];
             
              this.NotaCreditoE.SocioCode = event.target.value;
              this.NotaCreditoE.NombreSocio = res[0]['nombre'];
              this.NotaCreditoE.RTN = res[0]['rtn'];
              this.NotaCreditoE.Direccion = res[0]['direccion'];
              this.NotaCreditoE.comentarios = res[0]['observaciones'];
              this.codlista = res[0]['codlista'];
              this.NotaCreditoForm.get('NombreSocio').setValue(this.NotaCreditoE.NombreSocio);
              this.NotaCreditoForm.get('RTN').setValue(this.NotaCreditoE.RTN);
              this.NotaCreditoForm.get('direccion').setValue(this.NotaCreditoE.Direccion);
              this.NotaCreditoForm.get('comentario').setValue(this.NotaCreditoE.comentarios);
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
  return valor * 0.15;
}
  grandTotal(): number{
  let valor = 0;
  valor = this.totalGeneral() + this.isv();
  return valor;
}
grandTotalSINIVA(): number{
    let valor = 0;
    valor = this.totalGeneral() ;
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

      this.notacreditoService.getInfo('/products/info', event.target.value, this.codlista).subscribe(
          (res) => {

              this.Detalle = res[0];
              const index = this.ELEMENT_DATA.length + 1;
              this.ELEMENT_DATA.push({
                  DocNum: this.NotaCreditoE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: this.Detalle.price,
                cantidad: 1,
                DescuentoLine: 0,
                totaLine: this.total(1, this.Detalle.price, 0),
                almacen: this.Detalle.cbod+"",
                impuestocod: 0,
              });      
           
              this.productItem = null;
              this.validarISV=true;
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
       this.notacreditoService.getInfo('/products/info', this.productItem, this.codlista).subscribe(
        (res) => {
           this.Detalle = res[0];
           const index = this.ELEMENT_DATA.length + 1;
           this.ELEMENT_DATA.push({
                DocNum: this.NotaCreditoE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: this.Detalle.price,
                cantidad: 1,
                DescuentoLine: 0,
                totaLine: this.total(1, this.Detalle.price, 0),
                almacen: this.Detalle.cbod+"",
                impuestocod: 0,
            });
        
           this.productItem = null;
           this.validarISV=true;
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
    this.notacreditoService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
        (res) => {
this.bodegas = res;
        }
    );
}
validarExist(eve) {
    let stock = 0;
    this.notacreditoService.getExistencia('/products/Existencia', eve.itemCode, eve.almacen).subscribe(
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
    this.NotaCreditoE.SocioCode =  this.NotaCreditoForm.get('SocioCode').value;
    this.NotaCreditoE.NombreSocio =  this.NotaCreditoForm.get('NombreSocio').value;
    this.NotaCreditoE.Moneda = 'LPS';

   if( this.typeDocum === 'entrega'){
    this.NotaCreditoE.TotalDoc = this.grandTotalSINIVA();
    this.NotaCreditoE.impuesto = 0; 
   }else{
    this.NotaCreditoE.TotalDoc = this.grandTotal();
    this.NotaCreditoE.impuesto = this.isv();
   }

    
let user=JSON.parse(localStorage.getItem('usuario'));
this.NotaCreditoE.UserCreate = user.usuario ;
    this.NotaCreditoE.comentarios = '';
    this.NotaCreditoE.tasa = 0;
    this.NotaCreditoE.vendedor = 1;

    this.NotaCreditoE.DescPorcentaje = 0;
    this.NotaCreditoE.fechaDoc = this.NotaCreditoForm.get('fechaDoc').value;
    this.NotaCreditoE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // this.NotaCreditoE.fechaDoc=  format(new Date(this.NotaCreditoE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.docum.DocNum = this.NotaCreditoE.DocNum;
    this.NotaCreditoE.tipo = 'NOTACREDITO';
    this.NotaCreditoE.Serie = this.selectSerie[0]['cnum'];

    this.NotaCreditoE.ccomp = this.selectSerie[0]['ccomp']; 
    this.NotaCreditoE.cai = this.selectSerie[0]['cai']; 
    this.NotaCreditoE.fact_emini = this.selectSerie[0]['fact_emini']; 
    this.NotaCreditoE.fact_emifin = this.selectSerie[0]['fact_emifin']; 
    this.NotaCreditoE.correo = this.selectSerie[0]['correo']; 
    this.NotaCreditoE.fecha_limite = format(new Date(this.selectSerie[0]['fecha_limite']), 'yyyy-MM-dd HH:mm:ss');
    this.NotaCreditoE.RTN = this.NotaCreditoForm.get('RTN').value;
    this.NotaCreditoE.Direccion = this.NotaCreditoForm.get('direccion').value;
    this.NotaCreditoE.comentarios = this.NotaCreditoForm.get('comentario').value;
    const cnum = this.selectSerie[0]['cnum'];
    delete this.NotaCreditoE.DocNum;

    this.guardarValidaciones('Lasagna', (valida: valida[]) => {

     
        const validaciones = valida.find(valor => valor.Stock === 'false' ||  valor.Stock === 'BODEGA');

        ///////////////////// grabar en tabla//////////////////////////////////
        if (!validaciones) {
            this.notacreditoService.addnotacreditoEncabezado(this.NotaCreditoE).then(respuesta => {

                    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

                        this.notacreditoService.addnotacreditoDetalle(this.ELEMENT_DATA[index]);
                        // tslint:disable-next-line: max-line-length
                        this.notacreditoService.getNCExistencia('/products/getNCExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'], this.ELEMENT_DATA[index]['cantidad']);
       
                    }
                    if (this.typeDocum === 'factura' || this.typeDocum === 'entrega'){
                        this.notacreditoService.updatestatusC(this.pageType, 'C');
                       }
                    this.notacreditoService.updateCorrelativo(cnum);

                })
                .then(resp => {
                    this._matSnackBar.open('NotaCredito Agregada!', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    // Change the location with new one

                    this.router.navigate(['ventas/notacreditos']);
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

    let stock = 0;

    let contador = 0;
    this.ELEMENT_VALIDADOR = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {


        this.notacreditoService.getExistencia('/products/Existencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen']).subscribe(
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
    this.NotaCreditoE.TotalDoc = this.grandTotal();
    this.NotaCreditoE.impuesto = this.isv();
    this.NotaCreditoE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.NotaCreditoE.fechaDoc = this.NotaCreditoForm.get('fechaDoc').value;
    // this.NotaCreditoE.fechaDoc=   format(new Date(this.NotaCreditoE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.NotaCreditoE.tipo = 'NOTACREDITO';
    this.docum.DocNum = this.NotaCreditoE.numero;

    this.NotaCreditoE.fecha_limite = format(new Date(this.NotaCreditoE.fecha_limite), 'yyyy-MM-dd HH:mm:ss');
    this.NotaCreditoE.RTN = this.NotaCreditoForm.get('RTN').value;
    this.NotaCreditoE.Direccion = this.NotaCreditoForm.get('direccion').value;
    this.NotaCreditoE.comentarios = this.NotaCreditoForm.get('comentario').value;



    this.notacreditoService.updatenotacreditoEncabezado(this.NotaCreditoE).then(respuesta => {


        })
        .then(resp => {
            this._matSnackBar.open('NotaCredito Modificada!', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one

            this.router.navigate(['ventas/notacreditos']);
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

createfacturaForm(): FormGroup {
    return this._formBuilder.group({
        SocioCode: [this.NotaCreditoE.SocioCode, Validators.required],
        NombreSocio: [this.NotaCreditoE.NombreSocio, Validators.required],
        fechaDoc: [this.NotaCreditoE.fechaDoc, Validators.required],
        serie: [this.NotaCreditoE.Serie, Validators.required],
        RTN: [this.NotaCreditoE.RTN],
       comentario: [this.NotaCreditoE.comentarios],
         direccion: [this.NotaCreditoE.Direccion]
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
