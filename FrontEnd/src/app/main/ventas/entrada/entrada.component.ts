import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EntradasService } from '../entradas/entradas.service';
import { Order, entradaDetalle, entradaEncabezado } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss'],
  encapsulation: ViewEncapsulation.None, 
  animations   : fuseAnimations
})
export class EntradaComponent implements OnInit {

  displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Price', 'Cantidad','Bodega', 'actions'];
  ELEMENT_DATA: Element[] = [];
  ELEMENT_VALIDADOR: valida[] = []; 
 formap: validapago[] = [];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  EntradaE: entradaEncabezado = {};
  EntradaD: entradaDetalle = {};
  selectedSerie: boolean;
  validaciones = false;
  Ftupdate = true;
  codlista: any;
  docum: any =
      {
          DocNum: ''   
    };
    selectBod: any;
  EntradaForm: FormGroup;
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


  constructor(private entradasService: EntradasService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,  
              private _matSnackBar: MatSnackBar,
              private router: Router) {
           
                this.user=JSON.parse(localStorage.getItem('usuario'));
                this.order = new Order();
      // Set the private defaults
                this._unsubscribeAll = new Subject();

                this.EntradaForm = this.createcotizacionForm();
                this.entradasService.getAll('/usuarios').subscribe( 
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
this.EntradaForm.get('id').setValue(this.user.usuario);
                this.entradasService.getAll('/products').subscribe(
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
        this.EntradaE.fechaDoc=new Date();
        this.EntradaForm.get("fechaDoc").setValue(this.EntradaE.fechaDoc);
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
      if (params.tipo == 'entrada'){
          buscarE = '/entrada/Encabezado';
          buscarD = '/entrada/Detalle';
         }
         this.entradasService.getOne(buscarE, params.id).subscribe(
            (res) => {
               
                this.EntradaE = res[0];
                if (params.tipo != 'entrada'){

                }
                // this.series.cnum=res["Serie"];
                this.EntradaForm = this.createcotizacionForm();
            }
        );
      this.entradasService.getOne(buscarD, params.id).subscribe(
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
    this.entradasService.getnumeracion('/entrada/correlativo', user.company, 'Entrada Mercaderia').subscribe(
        (res) => {
         //   this.EntradaE.DocNum=res[0]['Correlativo'];
           this.series = res; 
        }
    );
   }


   borrarFila(DocNum: string) {

    if (confirm("Realmente quiere borrarlo?"+DocNum)) {
  
        this.entradasService.updatestatusC(DocNum,'C');
  
    //     this.dataSource.splice(cod, 1);
    //   this.tabla1.renderRows();
  
   
   
    }
  
    this.router.navigate(['ventas/entradas']);
  }


   numerosuc(event){

    const user = JSON.parse(localStorage.getItem('usuario'));
    this.entradasService.getOnenumeracion('/entrada/correlativoOne', user.company, 'entrada', event).subscribe(
        (res1) => {
            this.selectSerie = res1;
 
            this.entradasService.getformato('/entrada/formato', res1[0]['correlativo']).subscribe(
                (res) => {
                    this.selecSerieS = true;
                    this.EntradaE.DocNum = res1[0]['correlativo'];
                    this.EntradaE.numero = res1[0]['prefijo'] + res[0]['Numero'];
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
                        this.ELEMENT_DATA[index]['DocNum'] = this.EntradaE.numero;
                        }

                }
            );
        //   this.series=res; 
        }
       
    );
    this.selectedSerie = true;
   }





  complete(event) {
      this.entradasService.getOneSocio('/usuarios/edit', event.target.value).subscribe(
          (res) => {

            //this.EntradaE.cuser = event.target.value;
            this.EntradaE.UserCreate = res[0]['UserCreate'];
            //this.EntradaE.UserCreate = res[0]['UserCreate'];
            this.EntradaForm.get('comentario').setValue(this.EntradaE.comentarios);
     
           // this.EntradaE.comentarios = res[0]['observaciones'];
            //this.EntradaE.comentarios = res[0]['observaciones'];
          //  this.codlista = res[0]['codlista'];
          //  this.EntradaForm.get('comentario').setValue(this.EntradaE.comentarios);
     

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
            this.entradasService.getInfoComp('/products/infoComp', event.target.value).subscribe(
          (res) => {
            this.Detalle = res[0];
            const index = this.ELEMENT_DATA.length + 1;
            this.ELEMENT_DATA.push({
                DocNum: this.EntradaE.numero,
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
            this.entradasService.getInfoComp('/products/infoComp', this.productItem).subscribe(
        (res) => {
           this.Detalle = res[0];
           const index = this.ELEMENT_DATA.length + 1;
           this.ELEMENT_DATA.push({
                DocNum: this.EntradaE.numero,
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
    this.entradasService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
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

    this.EntradaE.UserCreate = this.socios[0]['usuario'];
    this.EntradaE.comentarios = '';
    //this.EntradaE.fechaDoc = this.EntradaForm.get(format('fechaDoc','yyyy-MM-dd HH:mm:ss')).value;
    this.EntradaE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // this.EntradaE.fechaDoc=  format(new Date(this.EntradaE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.docum.DocNum = this.EntradaE.DocNum;
    this.EntradaE.tipo = 'ENTRADA';
    this.EntradaE.Serie = this.selectSerie[0]['cnum'];
    this.EntradaE.ccomp = this.selectSerie[0]['ccomp']; 
    this.EntradaE.comentarios = this.EntradaForm.get('comentario').value;

    const cnum = this.selectSerie[0]['cnum'];
    this.EntradaE.status="A";

    delete this.EntradaE.DocNum;



     
 
            this.entradasService.addpedidoEncabezado(this.EntradaE).then(respuesta => {

           
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

                        this.entradasService.addpedidoDetalle(this.ELEMENT_DATA[index]);
                     
                        this.entradasService.comprasExistencia('/products/comprasExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'], this.ELEMENT_DATA[index]['cantidad']); 
                                          
  

                   
                    }
                    if (this.typeDocum === 'cotizacion'){
                        this.entradasService.updatestatusC(this.pageType, 'C');
                       }
                    this.entradasService.updateCorrelativo(cnum);

                })
                .then(resp => {
                    this._matSnackBar.open('Orden Compra Agregado!', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    // Change the location with new one

                    this.router.navigate(['ventas/entradas']);
                });

}


guardarValidaciones = (meal, callback) => {

let stock = 0;

let contador = 0;
this.ELEMENT_VALIDADOR = [];
// tslint:disable-next-line: prefer-for-of
for (let index = 0; index < this.ELEMENT_DATA.length; index++) {


    this.entradasService.ExcExistencia('/products/ExecExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'],this.ELEMENT_DATA[index]['tipo']).subscribe(
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

    this.EntradaE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.EntradaE.fechaDoc = this.EntradaForm.get('fechaDoc').value;
    // this.EntradaE.fechaDoc=   format(new Date(this.EntradaE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.EntradaE.tipo = 'ORDENCOMPRA';
    this.docum.DocNum = this.EntradaE.numero;
    this.EntradaE.comentarios = this.EntradaForm.get('comentario').value;




    this.entradasService.updatepedidoEncabezado(this.EntradaE).then(respuesta => {


        })
        .then(resp => {
            this._matSnackBar.open('Orden Compra Modificada!', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one

            this.router.navigate(['ventas/entradas']);
        });


}

createcotizacionForm(): FormGroup {
    return this._formBuilder.group({
        id:[this.EntradaE.id,Validators.required],
        fechaDoc: [this.EntradaE.fechaDoc, Validators.required],
        serie: [this.EntradaE.Serie, Validators.required],
        comentario: [this.EntradaE.comentarios],

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

