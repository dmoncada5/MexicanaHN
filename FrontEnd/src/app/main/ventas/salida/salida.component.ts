import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SalidasService } from '../salidas/salidas.service';
import { Order, salidaDetalle, salidaEncabezado } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.scss'],
  encapsulation: ViewEncapsulation.None, 
  animations   : fuseAnimations
})
export class SalidaComponent implements OnInit {

  displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Price', 'Cantidad','Bodega', 'actions'];
  ELEMENT_DATA: Element[] = [];
  ELEMENT_VALIDADOR: valida[] = []; 
 formap: validapago[] = [];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  SalidaE: salidaEncabezado = {};
  SalidaD: salidaDetalle = {};
  selectedSerie: boolean;
  validaciones = false;
  Ftupdate = true;
  codlista: any;
  docum: any =
      {
          DocNum: ''   
    };
    selectBod: any;
  SalidaForm: FormGroup;
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

  private _unsubscribeAll: Subject < any > ;


  constructor(private salidasService: SalidasService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,  
              private _matSnackBar: MatSnackBar,
              private router: Router) {
           

                this.order = new Order();
      // Set the private defaults
                this._unsubscribeAll = new Subject();

                this.SalidaForm = this.createcotizacionForm();
                this.salidasService.getAll('/usuarios').subscribe( 
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

                this.salidasService.getAll('/products').subscribe(
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
        this.SalidaE.fechaDoc=new Date();
        this.SalidaForm.get("fechaDoc").setValue(this.SalidaE.fechaDoc);
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
    //  if (params.tipo == 'salida'){
          buscarE = '/salida/Encabezado';
          buscarD = '/salida/Detalle';
   //      }

      this.salidasService.getOne(buscarE, params.id).subscribe(
            (res) => {
               
                this.SalidaE = res[0];
               
                this.SalidaForm = this.createcotizacionForm();
            }
        );
      this.salidasService.getOne(buscarD, params.id).subscribe(
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
    this.salidasService.getnumeracion('/salida/correlativo', user.company, 'Salida Mercaderia').subscribe(
        (res) => {
         //   this.SalidaE.DocNum=res[0]['Correlativo'];
           this.series = res; 
        }
    );
   }


   borrarFila(DocNum: string) {

    if (confirm("Realmente quiere borrarlo?"+DocNum)) {
  
        this.salidasService.updatestatusC(DocNum,'C');
  
    //     this.dataSource.splice(cod, 1);
    //   this.tabla1.renderRows();
  
   
   
    }
  
    this.router.navigate(['ventas/salidas']);
  }


   numerosuc(event){

    const user = JSON.parse(localStorage.getItem('usuario'));
    this.salidasService.getOnenumeracion('/salida/correlativoOne', user.company, 'Salida Mercaderia', event).subscribe(
        (res1) => {
            this.selectSerie = res1;
 
            this.salidasService.getformato('/salida/formato', res1[0]['correlativo']).subscribe(
                (res) => {
                    this.selecSerieS = true;
                    this.SalidaE.DocNum = res1[0]['correlativo'];
                    this.SalidaE.numero = res1[0]['prefijo'] + res[0]['Numero'];
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++){
                        this.ELEMENT_DATA[index]['DocNum'] = this.SalidaE.numero;
                        }

                }
            );
        //   this.series=res; 
        }
       
    );
    this.selectedSerie = true;
   }





  complete(event) {
      this.salidasService.getOneSocio('/usuarios/edit', event.target.value).subscribe(
          (res) => {

            //this.SalidaE.cuser = event.target.value;
            this.SalidaE.UserCreate = res[0]['UserCreate'];
            //this.SalidaE.UserCreate = res[0]['UserCreate'];
            this.SalidaForm.get('comentario').setValue(this.SalidaE.comentarios);
     
           // this.SalidaE.comentarios = res[0]['observaciones'];
            //this.SalidaE.comentarios = res[0]['observaciones'];
          //  this.codlista = res[0]['codlista'];
          //  this.SalidaForm.get('comentario').setValue(this.SalidaE.comentarios);
     

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
            this.salidasService.getInfoComp('/products/infoComp', event.target.value).subscribe(
          (res) => {
            this.Detalle = res[0];
            const index = this.ELEMENT_DATA.length + 1;
            this.ELEMENT_DATA.push({
                DocNum: this.SalidaE.numero,
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
            this.salidasService.getInfoComp('/products/infoComp', this.productItem).subscribe(
        (res) => {
           this.Detalle = res[0];
           const index = this.ELEMENT_DATA.length + 1;
           this.ELEMENT_DATA.push({
                DocNum: this.SalidaE.numero,
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
    this.salidasService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
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

    this.SalidaE.UserCreate = this.socios[0]['usuario'];
    this.SalidaE.comentarios = '';
    //this.SalidaE.fechaDoc = this.SalidaForm.get(format('fechaDoc','yyyy-MM-dd HH:mm:ss')).value;
    this.SalidaE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // this.SalidaE.fechaDoc=  format(new Date(this.SalidaE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.docum.DocNum = this.SalidaE.DocNum;
    this.SalidaE.tipo = 'SALIDA';
    this.SalidaE.Serie = this.selectSerie[0]['cnum'];
    this.SalidaE.ccomp = this.selectSerie[0]['ccomp']; 
    this.SalidaE.comentarios = this.SalidaForm.get('comentario').value;

    const cnum = this.selectSerie[0]['cnum'];
    this.SalidaE.status="A";

    delete this.SalidaE.DocNum;



     
 
            this.salidasService.addpedidoEncabezado(this.SalidaE).then(respuesta => {

           
                    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

                        this.salidasService.addpedidoDetalle(this.ELEMENT_DATA[index]);
                     
                     //   this.salidasService.comprasExistencia('/products/comprasExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'], this.ELEMENT_DATA[index]['cantidad']); 
                     this.salidasService.setExistencia('/products/setExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'], this.ELEMENT_DATA[index]['cantidad']);
                  
  

                   
                    }
                    if (this.typeDocum === 'cotizacion'){
                        this.salidasService.updatestatusC(this.pageType, 'C');
                       }
                    this.salidasService.updateCorrelativo(cnum);

                })
                .then(resp => {
                    this._matSnackBar.open('Orden Compra Agregado!', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    // Change the location with new one

                    this.router.navigate(['ventas/salidas']);
                });

}


guardarValidaciones = (meal, callback) => {

let stock = 0;

let contador = 0;
this.ELEMENT_VALIDADOR = [];
// tslint:disable-next-line: prefer-for-of
for (let index = 0; index < this.ELEMENT_DATA.length; index++) {


    this.salidasService.ExcExistencia('/products/ExecExistencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen'],this.ELEMENT_DATA[index]['tipo']).subscribe(
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

    this.SalidaE.LastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.SalidaE.fechaDoc = this.SalidaForm.get('fechaDoc').value;
    // this.SalidaE.fechaDoc=   format(new Date(this.SalidaE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
    this.SalidaE.tipo = 'ORDENCOMPRA';
    this.docum.DocNum = this.SalidaE.numero;
    this.SalidaE.comentarios = this.SalidaForm.get('comentario').value;




    this.salidasService.updatepedidoEncabezado(this.SalidaE).then(respuesta => {


        })
        .then(resp => {
            this._matSnackBar.open('Orden Compra Modificada!', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one

            this.router.navigate(['ventas/salidas']);
        });


}

createcotizacionForm(): FormGroup {
    return this._formBuilder.group({

        fechaDoc: [this.SalidaE.fechaDoc, Validators.required],
        serie: [this.SalidaE.Serie, Validators.required],
        comentario: [this.SalidaE.comentarios],

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

