import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CotizacionesService } from '../cotizaciones/cotizaciones.service';
import { cotizacionDetalle, cotizacionEncabezado } from '../interfaces/interfaces';
import { format } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BodegasComponent } from 'app/main/Configuracion/bodegas/bodegas.component';
import { fill } from 'lodash';
//import { Element } from '@angular/compiler';

// this.userForm.get('cproy').value; obtener data de form

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class CotizacionComponent implements OnInit {
  displayedColumns = ['Line', 'ItemCode', 'ItemName', 'Price', 'Cantidad', 'Descuento', 'Total','Bodega', 'actions'];
  ELEMENT_DATA: Element[] = [];
  ELEMENT_VALIDADOR: valida[] = [];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  cotizacionE: cotizacionEncabezado = {};
  cotizacionD: cotizacionDetalle={};
  selectedSerie: boolean;
  validaciones:boolean=false;
  Ftupdate: boolean=true;
  codlista:any;
  docum: any=
      {
          DocNum:0    
    }
  
  CotizacionForm: FormGroup;
  pageType: any;

  series: any;
  selectSerie: any;
  selecSerieS: any;
  selectBod:any;
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
  fecha=new Date();
  socioItem: any;

  private _unsubscribeAll: Subject < any > ;
    decimalPipe: any;

  constructor(private CotizacionesService: CotizacionesService,
      private activatedRoute: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private _matSnackBar: MatSnackBar,
      private router: Router) {


      // Set the private defaults
      this._unsubscribeAll = new Subject();

      this.CotizacionForm = this.createcotizacionForm();
      this.CotizacionesService.getAll('/socios').subscribe(
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

      this.CotizacionesService.getAll('/products').subscribe(
          (res) => {
            //   this.products[0] = res[0];
            //   this.products[1] = res[1];
            this.products=res
              this.filteredProducts = this.productosCtrl.valueChanges
                  .pipe(
                      startWith(''),
                      map(state => state ? this._filterProducts(state) : this.products.slice())
                  );
          }
      );

      this.cotizacionE.fechaDoc=new Date();
  }

  refreshTable() {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  borrarFila(DocNum: string) {

  if (confirm("Realmente quiere borrarlo?"+DocNum)) {

      this.CotizacionesService.updatestatusC(DocNum,'C');

  //     this.dataSource.splice(cod, 1);
  //   this.tabla1.renderRows();

 
 
  }

  this.router.navigate(['ventas/cotizaciones']);
}



  ngOnInit(): void {
      const params = this.activatedRoute.snapshot.params;
      this.pageType = params.id;
 
      if (params.id == 'new') {
        this.cotizacionE.fechaDoc=new Date();
        this.CotizacionForm.get("fechaDoc").setValue(this.cotizacionE.fechaDoc);
      //  this.CotizacionForm.get("cbod").setValue(this.cotizacionD.cbod);

        this.getNumerion();
        this.getbodegas();
        this.Ftupdate = true;
      } else
      if (params.id) {
        this.Ftupdate = true;
        this.getNumerion();
        this.getbodegas();
          this.CotizacionesService.getOne('/cotizacion/Encabezado', params.id).subscribe(
              (res) => {
                  this.cotizacionE = res[0];
                   this.CotizacionForm = this.createcotizacionForm();

                   this.CotizacionesService.getOneSocio('/socios/edit', this.cotizacionE.SocioCode).subscribe(
                    (res) => {     this.codlista=res[0]['codlista'];});
              }
          );
          this.CotizacionesService.getOne('/cotizacion/Detalle',params.id).subscribe(
            (res: any[])=>{
       
                for(let index=0;index<res.length;index++){
                    this.ELEMENT_DATA.push({
                        DocNum:params.id,
                        Linea: res[index]['Linea'],
                        itemCode: res[index]['itemCode'],
                        itemName: res[index]['itemName'],
                        precio: res[index]['precio'],
                        cantidad: res[index]['cantidad'],
                        DescuentoLine: res[index]['DescuentoLine'],
                        totaLine: res[index]['totaLine'],
                        almacen:res[index]['almacen'],
                        impuestocod:0,
                        tipo:res[index]['tipo']
                    });
                }
                this.refreshTable();
                this.totalGeneral();
              }
          )
      }
   }
   getNumerion(){
    
    let user = JSON.parse(localStorage.getItem('usuario'));
    this.CotizacionesService.getnumeracion('/cotizacion/correlativo', user.company, 'Cotizacion').subscribe(
        (res) => {
         //   this.FacturaE.DocNum=res[0]['Correlativo'];
           this.series = res; 
         
        }
    )
   }
   numerosuc(event){

    let user = JSON.parse(localStorage.getItem('usuario'));
    this.CotizacionesService.getOnenumeracion('/cotizacion/correlativoOne', user.company, 'Cotizacion', event).subscribe(
        (res1) => {
            this.selectSerie = res1;
 
            this.CotizacionesService.getformato('/cotizacion/formato', res1[0]['correlativo']).subscribe(
                (res) => {
this.selecSerieS = true;
this.cotizacionE.DocNum = res1[0]['correlativo'];
this.cotizacionE.numero = res1[0]['prefijo'] + res[0]['Numero']
for (let index = 0; index < this.ELEMENT_DATA.length; index++){
                        this.ELEMENT_DATA[index]['DocNum'] = this.cotizacionE.numero;
                        }
                }
            )
        //   this.series=res; 
        }
       
    )
    this.selectedSerie = true;
   }
  complete(event) {

    


    // let indice=0;
    // indice= this.ELEMENT_DATA.length
    // this.ELEMENT_DATA.splice(0,indice) ;

      this.CotizacionesService.getOneSocio('/socios/edit', event.target.value).subscribe(
          (res) => {
              this.cotizacionE.SocioCode= event.target.value;
              this.cotizacionE.NombreSocio = res[0]['nombre'];
              this.cotizacionE.RTN = res[0]['rtn'];
              this.cotizacionE.Direccion = res[0]['direccion'];
              this.cotizacionE.comentarios = res[0]['observaciones'];
             
              this.cotizacionE.SocioCode= event.target.value;
              this.cotizacionE.NombreSocio = res[0]['nombre'];
              this.cotizacionE.RTN=res[0]['rtn'];
              this.cotizacionE.Direccion=res[0]['direccion'];
              this.cotizacionE.comentarios=res[0]['observaciones'];
              this.codlista=res[0]['codlista'];
              this.CotizacionForm.get("NombreSocio").setValue(this.cotizacionE.NombreSocio);
              this.CotizacionForm.get("RTN").setValue(this.cotizacionE.RTN);
              this.CotizacionForm.get("direccion").setValue(this.cotizacionE.Direccion);
              this.CotizacionForm.get("comentario").setValue(this.cotizacionE.comentarios);

            //   for (let i = this.ELEMENT_DATA.length; i > 0; i--) {
            //     this.ELEMENT_DATA.pop();
            //   }
              this.ELEMENT_DATA.length=0;
              this.refreshTable();
              //this.Agregar(event);

          },
          (err) => {
              console.log(err);
          }
      )
  }
  Change(event) {
      const indice: number = this.ELEMENT_DATA.indexOf(event);
      this.ELEMENT_DATA[indice]['totaLine'] = this.total(event['cantidad'], event['precio'],event['DescuentoLine']);
    // this.validarExist(event);
      this.refreshTable();
  }

  total(cant: number, precio: number,descuento:number): number {
      return (cant * precio)-(cant * precio*15/100)- (cant * precio)*(descuento/100);
  }

  validarExist(eve) {
    let stock = 0;
    this.selectBod=true;
    this.CotizacionesService.getExistencia('/products/Existencia', eve.itemCode, eve.almacen).subscribe(
        (res: any[]) => {
                if (res.length === 0){
                    this.validaciones=false;
              this._matSnackBar.open('La bodega no esta asignada al producto seleccionado', 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
              });
            }else{
            stock = res[0]["stock"];
            if (eve.cantidad > stock) {
                this._matSnackBar.open('la cantidad recae sobre inventario negativo', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
                this.validaciones = false;
            } else {
                this.validaciones = true;
            }
          }
        }
    )
}
  totalGeneral():number{
    let valor=0;
    for(let index=0;index<this.ELEMENT_DATA.length;index++){
    valor+=this.ELEMENT_DATA[index]['totaLine'];
    }
    return valor;
    //return valor-(valor*15/100);
  }

  isv():number{
  let valor=0;
  for(let index=0;index<this.ELEMENT_DATA.length;index++){
  valor+=(this.ELEMENT_DATA[index]['precio']*this.ELEMENT_DATA[index]['cantidad']);
  }
  return valor*0.15;
}
  grandTotal():number{
  let  valor=0;
  valor=this.totalGeneral()+this.isv();
 //Math.round
  return valor;
}
  completeProducts(event) {


    if (this.Ftupdate==true){
        if ( !this.codlista) {
            this._matSnackBar.open('Debe de seleccionar un cliente', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            this.validaciones = false;
        }else{
            this.validaciones = true;
      this.CotizacionesService.getInfo('/products/info', event.target.value, this.codlista).subscribe(
          (res) => {
              this.Detalle = res[0];
              const index = this.ELEMENT_DATA.length + 1;
              this.ELEMENT_DATA.push({
                  DocNum:this.cotizacionE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                //precio: Number((((this.Detalle.price))-((this.Detalle.price)*15/100)).toFixed(2)),
                precio: this.Detalle.price,
                cantidad: 1,
                DescuentoLine: 0,
               // totaLine: Number((((this.total(1, this.Detalle.price, 0)))-((this.total(1, this.Detalle.price, 0))*15/100)).toFixed(2)),
                totaLine: this.total(1, this.Detalle.price,0),
                //totaLine: this.total(),
                //almacen:1,
                almacen:this.Detalle.cbod+"",
                impuestocod:0,
                tipo:this.Detalle.tipo
              });        
              this.productItem=null;
  
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
    if (this.Ftupdate==true){
        if ( !this.codlista) {
            this._matSnackBar.open('Debe de seleccionar un cliente', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            this.validaciones = false;
        }else{
       this.CotizacionesService.getInfo('/products/info', this.productItem, this.codlista).subscribe(
        (res) => {
            this.validaciones = true;
            this.Detalle = res[0];
            const index = this.ELEMENT_DATA.length + 1; 
            this.ELEMENT_DATA.push({
                DocNum:this.cotizacionE.numero,
                Linea: index,
                itemCode: this.Detalle.ItemCode,
                itemName: this.Detalle.ItemName,
                precio: this.Detalle.price,
                //precio: Number((((this.Detalle.price))-((this.Detalle.price)*15/100)).toFixed(2)),
                //precio: Number(((this.Detalle.price)/1.1499998).toFixed(4)),
                cantidad: 1,
                DescuentoLine: 0,
                //totaLine: Number(((this.total(1, this.Detalle.price, 0))/1.1499998).toFixed(4)),
                //totaLine: Number((((this.total(1, this.Detalle.price, 0)))-((this.total(1, this.Detalle.price, 0))*15/100)).toFixed(2)),
                totaLine: this.total(1, this.Detalle.price,0),
                almacen:this.Detalle.cbod+"",
               // almacen:1,
                impuestocod:0,
                tipo:this.Detalle.tipo
            });
            this.productItem=null;
            this.refreshTable();
        },
        (err) => {
            console.log(err);
        }
    );
    }}
  }

  getbodegas(){
    
    let user = JSON.parse(localStorage.getItem('usuario'));
    let comp = Number(user.company);
    this.CotizacionesService.getbodegasCompany('/bodegas/bodega', comp).subscribe(
        (res) => {
this.bodegas = res;

console.log(res,'bodegas')
        }
    )
}
  actions(event) {
      const indice: number = this.ELEMENT_DATA.indexOf(event);
      this.ELEMENT_DATA.splice(indice, 1);
      for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
          this.ELEMENT_DATA[index]['Linea'] = index + 1
      }
      if (this.ELEMENT_DATA.length===0){
          this.validaciones=false;
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
// this.cotizacionE.Moneda='LPS';
// this.cotizacionE.TotalDoc=this.grandTotal();
// this.cotizacionE.impuesto=this.isv();
// this.cotizacionE.UserCreate='dmoncada5';
// this.cotizacionE.comentarios='';
// this.cotizacionE.tasa=0;
// this.cotizacionE.vendedor=1;
// this.cotizacionE.Direccion='Prueba';
// this.cotizacionE.DescPorcentaje=0;
// this.cotizacionE.fechaDoc=this.CotizacionForm.get('fechaDoc').value;
//  this.cotizacionE.LastUpdate=  format(new Date(), "yyyy-MM-dd HH:mm:ss");
//  this.cotizacionE.fechaDoc=  format(new Date(this.cotizacionE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
//  this.docum.DocNum=this.cotizacionE.DocNum;
// this.cotizacionE.status="A";

this.cotizacionE.SocioCode =  this.CotizacionForm.get('SocioCode').value;
this.cotizacionE.NombreSocio =  this.CotizacionForm.get('NombreSocio').value;
this.cotizacionE.Moneda = 'LPS';
this.cotizacionE.TotalDoc = this.grandTotal();
this.cotizacionE.impuesto = this.isv();


let user=JSON.parse(localStorage.getItem('usuario'));
this.cotizacionE.UserCreate = user.usuario ;

this.cotizacionE.comentarios = '';
this.cotizacionE.tasa = 0;
this.cotizacionE.vendedor = 1;

this.cotizacionE.DescPorcentaje = 0;
this.cotizacionE.fechaDoc = this.CotizacionForm.get('fechaDoc').value;
this.cotizacionE.LastUpdate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
// this.FacturaE.fechaDoc=  format(new Date(this.FacturaE.fechaDoc), "yyyy-MM-dd HH:mm:ss");
this.docum.DocNum = this.cotizacionE.DocNum;
this.cotizacionE.tipo = 'COTIZACION';
this.cotizacionE.Serie = this.selectSerie[0]["cnum"];

this.cotizacionE.ccomp = this.selectSerie[0]["ccomp"]; ;
this.cotizacionE.cai = this.selectSerie[0]["cai"]; ;
this.cotizacionE.fact_emini = this.selectSerie[0]["fact_emini"]; ;
this.cotizacionE.fact_emifin = this.selectSerie[0]["fact_emifin"]; ;
this.cotizacionE.correo = this.selectSerie[0]["correo"]; ;
this.cotizacionE.fecha_limite = format(new Date(this.selectSerie[0]["fecha_limite"]), "yyyy-MM-dd HH:mm:ss");
this.cotizacionE.RTN = this.CotizacionForm.get('RTN').value;
this.cotizacionE.Direccion = this.CotizacionForm.get('direccion').value;
this.cotizacionE.comentarios = this.CotizacionForm.get('comentario').value;
let cnum = this.selectSerie[0]["cnum"];
this.cotizacionE.status="A";


delete this.cotizacionE.DocNum;

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

 this.CotizacionesService.addCotizacionEncabezado(this.cotizacionE).then(respuesta=>{
   
    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
      
        this.CotizacionesService.addCotizacionDetalle(this.ELEMENT_DATA[index]);
        // this.CotizacionesService.setExistencia('/products/setExistencia', this.ELEMENT_DATA[index]["itemCode"], this.ELEMENT_DATA[index]["almacen"], this.ELEMENT_DATA[index]["cantidad"])
                           
    }
    this.CotizacionesService.updateCorrelativo(cnum);

 })
 .then(resp=>{
    this._matSnackBar.open('Cotizacion Agregada!', 'OK', {
        verticalPosition: 'top',
        duration        : 2000
    });

    // Change the location with new one

    this.router.navigate(['ventas/cotizaciones']);
 })
    

  }


  guardarValidaciones = (meal, callback) => {

    let stock = 0;

    let contador = 0;
    this.ELEMENT_VALIDADOR = [];
    // tslint:disable-next-line: prefer-for-of
    
    for (let index = 0; index < this.ELEMENT_DATA.length; index++) {


        this.CotizacionesService.getExistencia('/products/Existencia', this.ELEMENT_DATA[index]['itemCode'], this.ELEMENT_DATA[index]['almacen']).subscribe(
            (res: any[]) => {
                if (res.length === 0){
                    const line = this.ELEMENT_VALIDADOR.length + 1;
                    this.ELEMENT_VALIDADOR.push({
                        Linea: line,
                        itemCode: this.ELEMENT_DATA[index]["itemCode"].toString(),
                        itemName: this.ELEMENT_DATA[index]["itemName"].toString(),
                        Stock: "BODEGA"
                    }, );
                
                }else{ 
                

                stock = res[0]["stock"];


                if (this.ELEMENT_DATA[index]["cantidad"] > stock) {
                    const line = this.ELEMENT_VALIDADOR.length + 1;
                    this.ELEMENT_VALIDADOR.push({
                        Linea: line,
                        itemCode: this.ELEMENT_DATA[index]["itemCode"].toString(),
                        itemName: this.ELEMENT_DATA[index]["itemName"].toString(),
                        Stock: "false"
                    }, );
                } else {
                    const line = this.ELEMENT_VALIDADOR.length + 1;
                    this.ELEMENT_VALIDADOR.push({
                        Linea: line,
                        itemCode: this.ELEMENT_DATA[index]["itemCode"].toString(),
                        itemName: this.ELEMENT_DATA[index]["itemName"].toString(),
                        Stock: "true"
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

    this.cotizacionE.TotalDoc=this.grandTotal();
    this.cotizacionE.impuesto=this.isv();
 this.cotizacionE.LastUpdate=  format(new Date(), "yyyy-MM-dd HH:mm:ss");
//  this.cotizacionE.fechaDoc=  new Date(format(new Date(this.cotizacionE.fechaDoc), "yyyy-MM-dd HH:mm:ss"));
 this.cotizacionE.fechaDoc = this.CotizacionForm.get('fechaDoc').value;
 this.docum.DocNum=this.cotizacionE.numero;
 this.cotizacionE.fecha_limite = format(new Date(this.cotizacionE.fecha_limite), "yyyy-MM-dd HH:mm:ss");
 this.cotizacionE.RTN = this.CotizacionForm.get('RTN').value;
 this.cotizacionE.Direccion = this.CotizacionForm.get('direccion').value;
 this.cotizacionE.comentarios = this.CotizacionForm.get('comentario').value;

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

    
this.CotizacionesService.updateCotizacionEncabezado(this.cotizacionE).then(respuesta=>{

    this.CotizacionesService.DeleteCotizacionDetalle( this.docum.DocNum).subscribe(
        res=>{
       for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
  
     let res=  this.CotizacionesService.addCotizacionDetalle(this.ELEMENT_DATA[index]);
             
   }
        }
    );
    
  

})
.then(resp=>{
   this._matSnackBar.open('Cotizacion Modificada!', 'OK', {
       verticalPosition: 'top',
       duration        : 2000
   });

   // Change the location with new one

   this.router.navigate(['ventas/cotizaciones']);
})
   

//  this.CotizacionesService.updateCotizacionEncabezado(this.cotizacionE).then(respuesta=>{
   
//     for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
//         console.log(index,this.ELEMENT_DATA[index])
//     this.CotizacionesService.addCotizacionDetalle(this.ELEMENT_DATA[index]);
//         }

//  })
//  .then(resp=>{
//     this._matSnackBar.open('Cotizacion Modificada!', 'OK', {
//         verticalPosition: 'top',
//         duration        : 2000
//     });

//     // Change the location with new one

//     this.router.navigate(['ventas/cotizaciones']);
//  })


  }

  createcotizacionForm(): FormGroup {
          return this._formBuilder.group({ 
          SocioCode: [this.cotizacionE.SocioCode, Validators.required],
          NombreSocio: [this.cotizacionE.NombreSocio, Validators.required],
          fechaDoc: [this.cotizacionE.fechaDoc, Validators.required],
          serie: [this.cotizacionE.Serie, Validators.required],
          RTN: [this.cotizacionE.RTN],
         comentario: [this.cotizacionE.comentarios],
           direccion: [this.cotizacionE.Direccion]      
      });
  }
  }

  export interface Element {
   DocNum:string, Linea: number, itemCode: string, itemName: string, precio: number, cantidad: number, DescuentoLine: number, totaLine: number,almacen: string,impuestocod: number,tipo:string
  }
  export interface valida {
    Linea: number;
    itemCode: string;
    itemName: string;
    Stock: string;
}

