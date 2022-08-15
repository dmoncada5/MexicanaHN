//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ListapreciosService } from '../listaprecios/listaprecios.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-listaprecio',
  templateUrl: './listaprecio.component.html',
  styleUrls: ['./listaprecio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ListaprecioComponent implements OnInit {
  ELEMENT_DATA: Element[] = [];
  displayedColumns = ['ItemCode', 'ItemName', 'Price'];

  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  listaprecios: any = {
    codlist: null,
    lista: null,
    fechacreacion: null,
    estado: null        
  };
  pageType: string;
  listaprecioForm: FormGroup;
 // moneda: any = [];
  //paises: any = [];

  constructor(private listapreciosService: ListapreciosService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router) {
      this.listaprecioForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]

        codlista: ['', ],
        lista: ['', Validators.required],          
        fechacreacion: ['', Validators.required],
        estado: ['', Validators.required]   
      });
     }

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){
      this.listaprecios.fechacreacion =new Date();
      this.listaprecioForm.get("fechacreacion").setValue(this.listaprecios.fechacreacion);
}else
    if (params.id) {
this.listapreciosService.getListaPrecioOne('/listaprecios/edit/', params.id).subscribe(
  (res) => {
  this.listaprecios = res[0];
  this.listaprecioForm.controls.codlista.setValue(this.listaprecios['codlista']);
  this.listaprecioForm.controls.lista.setValue(this.listaprecios['lista']);
    this.listaprecioForm.controls.fechacreacion.setValue(this.listaprecios['fechacreacion']);
  this.listaprecioForm.controls.estado.setValue(this.listaprecios['estado']);
    
  });

  


  this.listapreciosService.getOneProductsWithPrice('/listaprecios/productsPrice', params.id).subscribe(
    (res: any[]) => {

        for (let index = 0; index < res.length; index++){
            this.ELEMENT_DATA.push({
             
                ItemCode: res[index]['ItemCode'],
                ItemName: res[index]['ItemName'],
                price: res[index]['price'],
                   });
        }

        this.refreshTable();
  
      }
  );




    }






  }

applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
}
  
  refreshTable() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
}

  addListaPrecio(){ 
    const data = this.listaprecioForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.listapreciosService.addListaPrecio(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Lista de Precios added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/listaprecios']);
       }).catch((err) => {console.log(err);});
       

 }

 Change(){
   this.refreshTable();
 }
 saveListaPrecio(){
   const data = this.listaprecioForm.getRawValue();
   data.handle = FuseUtils.handleize(data.codlista);
   let user=JSON.parse(localStorage.getItem('usuario'));
   this.listapreciosService.saveListaPrecio(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message

           for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

            this.listapreciosService.ActualizarPrecio('/listaprecios/ActualizarPrecio',this.ELEMENT_DATA[index]["price"],this.ELEMENT_DATA[index]["ItemCode"],parseInt(this.pageType)  ,"LPS",user.company).subscribe(
              (res)=>{

              }
            )
        
           }

           this._matSnackBar.open('Lista de Precios saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/listaprecios']);


       });

 }

}
export interface Element {
  ItemCode: string; ItemName: string; price: number;
}