import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SolicitudtsService } from '../solicitudts/solicitudts.service';
import { Order, solicitudtDetalle, solicitudtEncabezado } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-solicitudt',
  templateUrl: './solicitudt.component.html',
  styleUrls: ['./solicitudt.component.scss'],
  encapsulation: ViewEncapsulation.None, 
  animations   : fuseAnimations
})
export class SolicitudtComponent implements OnInit {

  displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Price', 'Cantidad','Bodega', 'actions'];
  ELEMENT_DATA: Element[] = [];
  ELEMENT_VALIDADOR: valida[] = []; 
 formap: validapago[] = [];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  SolicitudtE: solicitudtEncabezado = {};
  SolicitudtD: solicitudtDetalle = {};
  selectedSerie: boolean;
  validaciones = false;
  Ftupdate = true;
  codlista: any;
  docum: any =
      {
          DocNum: ''   
    };
    selectBod: any;
  SolicitudtForm: FormGroup;
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

bodegas: any;

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
  user: any;
  
  private _unsubscribeAll: Subject < any > ;


  constructor(private solicitudtsService: SolicitudtsService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,  
              private _matSnackBar: MatSnackBar,
              private router: Router) {
           
                this.user=JSON.parse(localStorage.getItem('usuario'));
                this.order = new Order();
      // Set the private defaults
                this._unsubscribeAll = new Subject();

                this.SolicitudtForm = this.createcotizacionForm();
                this.solicitudtsService.getAll('/usuarios').subscribe( 
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
this.SolicitudtForm.get('id').setValue(this.user.usuario);
                this.solicitudtsService.getAll('/products').subscribe(
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
        this.SolicitudtE.fechaDoc=new Date();
        this.SolicitudtForm.get("fechaDoc").setValue(this.SolicitudtE.fechaDoc);
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
      if (params.tipo == 'solicitudt'){
          buscarE = '/solicitudt/Encabezado';
          buscarD = '/solicitudt/Detalle';
         }
         this.solicitudtsService.getOne(buscarE, params.id).subscribe(
            (res) => {
               
                this.SolicitudtE = res[0];
                if (params.tipo != 'solicitudt'){

                }
                // this.series.cnum=res["Serie"];
                this.SolicitudtForm = this.createcotizacionForm();
            }
        );
      this.solicitudtsService.getOne(buscarD, params.id).subscribe(
          (res: any[]) => {
              for (let index = 0; index < res.length; index++){
                  this.ELEMENT_DATA.push({
                      DocNum: params.id,
                      Linea: res[index]['Linea'],
                      itemCode: res[index]['itemCode'],
                      itemName: res[index]['itemName'],
                      precio: res[index]['precio'],
                      cantidad: res[index]['cantidad'],
                      almacen: res[index]['almacen'],
                      //tipo:res[index]['tipo'],
                  });
              }
              this.selectedSerie = true;
              this.validaciones = true;
              this.refreshTable();
        //ks      this.totalGeneral();
            }
        );
    }
    

 }









   getNumerion(){
    
    const user = JSON.parse(localStorage.getItem('usuario'));
    this.solicitudtsService.getnumeracion('/solicitudt/correlativo', user.company, 'Solicitudt Mercaderia').subscribe(
        (res) => {
         //   this.SolicitudtE.DocNum=res[0]['Correlativo'];
           this.series = res; 
        }
    );
   }


   borrarFila(DocNum: string) {

    if (confirm("Realmente quiere borrarlo?"+DocNum)) {
  
        this.solicitudtsService.updatestatusC(DocNum,'C');
  
    //     this.dataSource.splice(cod, 1);
    //   this.tabla1.renderRows();
  
   
   
    }
  
    this.router.navigate(['ventas/solicitudts']);
  }


   numerosuc(event){

    const user = JSON.parse(localStorage.getItem('usuario'));
    this.solicitudtsService.getOnenumeracion('/solicitudt/correlativoOne', user.company, 'solicitudt', event).subscribe(
        (res1) => {
            this.selectSerie = res1;
 
            this.solicitudtsService.getformato('/solicitudt/formato', res1[0]['correlativo']).subscribe(
                (res) => {
                    this.selecSerieS = true;
                    this.SolicitudtE.DocNum = res1[0]['correlativo'];
                    this.SolicitudtE.numero = res1[0]['prefijo'] + res[0]['Numero'];
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
                        this.ELEMENT_DATA[index]['DocNum'] = this.SolicitudtE.numero;
                        }

                }
            );
        //   this.series=res; 
        }
       
    );
    this.selectedSerie = true;
   }





  complete(event) {
      this.solicitudtsService.getOneSocio('/usuarios/edit', event.target.value).subscribe(
          (res) => {

            //this.SolicitudtE.cuser = event.target.value;
            this.SolicitudtE.UserCreate = res[0]['UserCreate'];
            //this.SolicitudtE.UserCreate = res[0]['UserCreate'];
            this.SolicitudtForm.get('comentario').setValue(this.SolicitudtE.comentarios);
     
           // this.SolicitudtE.comentarios = res[0]['observaciones'];
            //this.SolicitudtE.comentarios = res[0]['observaciones'];
          //  this.codlista = res[0]['codlista'];
          //  this.SolicitudtForm.get('comentario').setValue(this.SolicitudtE.comentarios);
     

      },
          (err) => {
              console.log(err);
          }
      );
  }

  /*
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

  grandTotal(): number{
  let valor = 0;
  valor = this.totalGeneral() + this.isv();
  return valor;
}
*/

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
            this.solicitudtsService.getInfoComp('/products/infoComp', event.target.value).subscribe(
          (res) => {
            this.Detalle = res[0];
            const index = this.ELEMENT_DATA.length + 1;
            this.ELEMENT_DATA.push({
                DocNum: this.SolicitudtE.numero,
              Linea: index,
              itemCode: this.Detalle.ItemCode,
              itemName: this.Detalle.ItemName,
              precio: 0,
              // precio: this.Detalle.price,
              cantidad: 1,
              // totaLine: this.total(1, this.Detalle.price,0),
              almacen: 0,
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
     /*   if ( !this.codlista) {
            this._matSnackBar.open('Debe de seleccionar un cliente', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            this.validaciones = false;
        }else{*/
            this.validaciones = true;
            this.solicitudtsService.getInfoComp('/products/infoComp', this.productItem).subscribe(
        (res) => {
           this.Detalle = res[0];
           const index = this.ELEMENT_DATA.length + 1;
           this.ELEMENT_DATA.push({
                DocNum: this.SolicitudtE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: 0,
                // precio: this.Detalle.price,
                cantidad: 1,
                // totaLine: this.total(1, this.Detalle.price,0),
                almacen: 0,
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
//}

getbodegas(){
    
    const user = JSON.parse(localStorage.getItem('usuario'));
    const comp = Number(user.company);
    this.solicitudtsService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
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

    this.SolicitudtE.UserCreate = this.socios[0]['usuario'];
    this.SolicitudtE.comentarios = '';
    //this.SolicitudtE.fechaDoc = this.SolicitudtForm.get(format('fechaDoc','yyyy-MM-dd HH:mm:ss')).value;
    this.SolicitudtE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // this.SolicitudtE.fechaDoc=  format(new Date(this.SolicitudtE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.docum.DocNum = this.SolicitudtE.DocNum;
    this.SolicitudtE.tipo = 'ENTRADA';
    this.SolicitudtE.Serie = this.selectSerie[0]['cnum'];
    this.SolicitudtE.ccomp = this.selectSerie[0]['ccomp']; 
    this.SolicitudtE.comentarios = this.SolicitudtForm.get('comentario').value;

    const cnum = this.selectSerie[0]['cnum'];
    this.SolicitudtE.status="A";

    delete this.SolicitudtE.DocNum;



     
 
            this.solicitudtsService.addpedidoEncabezado(this.SolicitudtE).then(respuesta => {

           
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

                        this.solicitudtsService.addpedidoDetalle(this.ELEMENT_DATA[index]);
                     
                        this.solicitudtsService.comprasExistencia('/products/comprasExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'], this.ELEMENT_DATA[index]['cantidad']); 
                                          
  

                   
                    }
                    if (this.typeDocum === 'cotizacion'){
                        this.solicitudtsService.updatestatusC(this.pageType, 'C');
                       }
                    this.solicitudtsService.updateCorrelativo(cnum);

                })
                .then(resp => {
                    this._matSnackBar.open('Orden Compra Agregado!', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    // Change the location with new one

                    this.router.navigate(['ventas/solicitudts']);
                });

}


guardarValidaciones = (meal, callback) => {

let stock = 0;

let contador = 0;
this.ELEMENT_VALIDADOR = [];
// tslint:disable-next-line: prefer-for-of
for (let index = 0; index < this.ELEMENT_DATA.length; index++) {


    this.solicitudtsService.ExcExistencia('/products/ExecExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'],this.ELEMENT_DATA[index]['tipo']).subscribe(
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

    this.SolicitudtE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.SolicitudtE.fechaDoc = this.SolicitudtForm.get('fechaDoc').value;
    // this.SolicitudtE.fechaDoc=   format(new Date(this.SolicitudtE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.SolicitudtE.tipo = 'ORDENCOMPRA';
    this.docum.DocNum = this.SolicitudtE.numero;
    this.SolicitudtE.comentarios = this.SolicitudtForm.get('comentario').value;




    this.solicitudtsService.updatepedidoEncabezado(this.SolicitudtE).then(respuesta => {


        })
        .then(resp => {
            this._matSnackBar.open('Orden Compra Modificada!', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one

            this.router.navigate(['ventas/solicitudts']);
        });


}

createcotizacionForm(): FormGroup {
    return this._formBuilder.group({
        id:[this.SolicitudtE.id,Validators.required],
        fechaDoc: [this.SolicitudtE.fechaDoc, Validators.required],
        serie: [this.SolicitudtE.Serie, Validators.required],
        comentario: [this.SolicitudtE.comentarios],

    });
}
}

export interface Element {
    // tslint:disable-next-line: max-line-length
    DocNum: string; Linea: number; itemCode: string; itemName: string; precio: number; cantidad: number;  almacen: number
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

