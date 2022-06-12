import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { CitasService } from '../citas/citas.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

import { format } from 'date-fns';



@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class CitaComponent implements OnInit {
  productosCtrl = new FormControl();
  //socioCtrl = new FormControl();
  ExpedienteCtrl = new FormControl();
  filteredProducts: Observable < any[] > ;
  filteredExpediente: Observable < any[] > ;

  productItem: any;
  expItem: any;
  products: any;
  expediente:any;
  statusForm: FormGroup;
  info:any;
  ELEMENT_DATA: Element[] = [];
  cita: any = {

    cexp: 0,   
  
    pesoini: null,
    pesoact: null,  
    talla: null,
    tallacms: null,
    imc: null,
    ptr: null,
    areagrasa: null,
    areamusc: null,
    fechavisita: null,
    proximavisita: null,
    estado: null,
    telefono:null,
    correo:null
    
    
    
  };

  productsAdd:any ={
      productosCitaid:null,
      cexp:null,
      ccita:null,
      ItemCode:null,
      ItemName:null,
      cantidad:null,
      ProximaCompra:new Date,

  }
  pageType: string;
  citaForm: FormGroup;
  CitaNum:any;
  private _unsubscribeAll: Subject < any > ;
  //company: any = [];
  //sucursal: any = [];
  //socionegocio: any = [];

  constructor(private citasService: CitasService, 
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _matSnackBar: MatSnackBar,
              private router: Router) {
  
                this._unsubscribeAll = new Subject();

     

    this.citasService.getAll('/cita/').subscribe(
      (res) => {
          this.expediente = res; 

       
        //   this.products[0] = res[0];
        //   this.products[1] = res[1];
          this.filteredExpediente= this.ExpedienteCtrl.valueChanges
              .pipe(
                  startWith(''),
                  map(state => state ? this._filterExpediente(state) : this.expediente.slice())
              );
      }
  );
    this.statusForm = this._formBuilder.group({
   
      ItemCode: ['',Validators.required],
      ItemName:['', Validators.required],
      cantidad:['', Validators.required],
      ProximaCompra:['', Validators.required],


  });

  this.citaForm = _formBuilder.group({
    ccita:[''],
    cexp: ['', Validators.required],        
  
    pesoini: ['', Validators.required],
    pesoact: ['', Validators.required],       
    talla: ['', Validators.required],
    tallacms: ['', Validators.required],
    imc: ['', Validators.required],
    ptr: ['', Validators.required],
    areagrasa: ['', Validators.required],
    areamusc: ['', Validators.required],
    fechavisita: ['', Validators.required],
    proximavisita: ['', Validators.required],        
    estado: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', Validators.required]      

  });

     }


     datos(event){
  
      if (this.pageType==='new') {
    
      this.citasService.getExpOne('/cita/Data',event).subscribe(
        (res) => {

        this.citaForm.controls.pesoini.setValue(res[0]['pesoini']);
        this.citaForm.controls.pesoact.setValue(res[0]['pesoact']);
        this.citaForm.controls.talla.setValue(res[0]['talla']);
        this.citaForm.controls.tallacms.setValue(res[0]['tallacms']);
        this.citaForm.controls.imc.setValue(res[0]['imc']);
        this.citaForm.controls.ptr.setValue(res[0]['ptr']);
        this.citaForm.controls.areagrasa.setValue(res[0]['areagrasa']);
        this.citaForm.controls.areamusc.setValue(res[0]['areamusc']);
        this.citaForm.controls.telefono.setValue(res[0]['telefono']);
        this.citaForm.controls.correo.setValue(res[0]['correo']);
      
        }

      )
    }
     }


  ngOnInit(): void {
    
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;


  
    if (params.id == 'new'){
      this.citasService.getAll('/cita/numpago').subscribe(
        (res)=>{
    this.CitaNum=res[0]["citaid"];
    this.citaForm.controls.ccita.setValue(this.CitaNum);
    this.expItem=params.param;
    this.datos(this.expItem);
    }
    
      )
        

}else
    if (params.id) {
this.citasService.getCitaOne('/cita/edit/', params.id).subscribe(
  (res) => {
  this.cita = res[0];

  this.citaForm.controls.ccita.setValue(this.cita['ccita']);
  this.citaForm.controls.cexp.setValue(this.cita['cexp']);  
  this.citaForm.controls.pesoini.setValue(this.cita['pesoini']);
  this.citaForm.controls.pesoact.setValue(this.cita['pesoact']);
  this.citaForm.controls.talla.setValue(this.cita['talla']);
  this.citaForm.controls.tallacms.setValue(this.cita['tallacms']);
  this.citaForm.controls.imc.setValue(this.cita['imc']);
  this.citaForm.controls.ptr.setValue(this.cita['ptr']);
  this.citaForm.controls.areagrasa.setValue(this.cita['areagrasa']);
  this.citaForm.controls.areamusc.setValue(this.cita['areamusc']);
  this.citaForm.controls.fechavisita.setValue(this.cita['fechavisita']);
  this.citaForm.controls.proximavisita.setValue(this.cita['proximavisita']);
  this.citaForm.controls.estado.setValue(this.cita['estado']); 
  this.citaForm.controls.telefono.setValue(this.cita['telefono']);
  this.citaForm.controls.correo.setValue(this.cita['correo']);


this.citasService.getprod(this.cita['ccita']).subscribe(
  (res :any[])=>{
    for (let index = 0; index < res.length; index++){
      this.ELEMENT_DATA.push({
        cexp: res[index]["cexp"],
        ccita:res[index]["ccita"], 
        ItemCode: res[index]["ItemCode"], 
        ItemName: res[index]["ItemName"], 
         cantidad: res[index]["cantidad"],
         ProximaCompra: res[index]["ProximaCompra"],
         status:"viejo"
      });
  }
  }

)



  });

    }
  }
  getFormattedDate( originalDate ){
    originalDate = new Date(originalDate);
    return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}

private _filterProducts(value: string): any[] {
  const filterValue = value.toLowerCase();
  return this.products.filter(option => option.ItemName.toLowerCase().includes(filterValue));
}
private _filterExpediente(value: string): any[] {

const filterValue = value;
return this.expediente.filter(option => option.name.toLowerCase().includes(filterValue));
}


  addCita(){ 

    const data = this.citaForm.getRawValue();
    this.citasService.addCita(data)
        .then((res) => {
       for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
        if (this.ELEMENT_DATA[index]["status"]==="nuevo"){
        this.citasService.saveproduc(this.ELEMENT_DATA[index])
        .then((res) => { 
        });
      }
      } 
             this._matSnackBar.open('Cita guardada', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });
             // Change the location with new one
            this.router.navigate(['configuracion/citas/'+this.expItem]);
        });
 
 }
 saveCita(){
  const data = this.citaForm.getRawValue();
  this.citasService.saveCita(data)
      .then((res) => {
     for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
      if (this.ELEMENT_DATA[index]["status"]==="nuevo"){
      this.citasService.saveproduc(this.ELEMENT_DATA[index])
      .then((res) => { 
      });
    }
    } 
           this._matSnackBar.open('Cita guardada', 'OK', {
              verticalPosition: 'top',
              duration        : 2000
          });
           // Change the location with new one
          this.router.navigate(['configuracion/citas/'+this.expItem]);
      });

 }
 Agregar(){
  this.productsAdd.cexp=this.citaForm.get('cexp').value,
  this.productsAdd.ccita=this.CitaNum,
  this.productsAdd.ItemCode= this.statusForm.get('ItemCode').value;
  this.productsAdd.ItemName=this.statusForm.get('ItemName').value;
  this.productsAdd.cantidad=this.statusForm.get('cantidad').value;
  this.productsAdd.ProximaCompra=moment(this.statusForm.get('ProximaCompra').value.format("DD/MM/YYYY"));
  this.productsAdd.ProximaCompra=this.productsAdd.ProximaCompra._i;
  this.ELEMENT_DATA.push({
    cexp: this.citaForm.get('cexp').value,
   ccita:  this.citaForm.get('ccita').value, 
   ItemCode: this.statusForm.get('ItemCode').value, 
   ItemName: this.statusForm.get('ItemName').value, 
    cantidad: this.statusForm.get('cantidad').value,
    ProximaCompra: this.statusForm.get('ProximaCompra').value,
    status:"nuevo"
});
this.statusForm.reset();
 }

 completeProducts(event){

  this.citasService.getInfo2('/products/info2', event.target.value).subscribe(
    (res) => { 
console.log(res[0])
      // this.cita = res[0];
      this.statusForm.controls.ItemName.setValue(res[0]['ItemName']);
    }
  );
 }

 eliminar(e)
{

if(e.status==="viejo"){

this.citasService.DeleteProducto(e.ccita,e.ItemCode).subscribe(
  res=>{
    this._matSnackBar.open('Producto Eliminado', 'OK', {
      verticalPosition: 'top',
      duration        : 2000
  });
  this.citasService.getprod(this.cita['ccita']).subscribe(
    (res)=>{
      this.info=res;
    }
  )
  

  }
)
 
}


const indice: number = this.ELEMENT_DATA.indexOf(e);
this.ELEMENT_DATA.splice(indice, 1);
}
}
export interface Element {
  cexp: number; ccita: number; ItemCode: string; ItemName: string;  cantidad: number;ProximaCompra:string; status:string;
}

