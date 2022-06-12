import { Component, OnInit } from '@angular/core';
import { departamentos } from '../../../Interfaces/user';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {
  valorInput: number;
  TUser: any = [];
  user: departamentos = {
    cdepa: null ,
    cpais: null ,
    departamento: null,   
    estado: 'Activo'

  };

  TDepartamentos: any ;
  TPaises: any;
  Bloq: boolean=false;
  Chk: boolean = false;
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getDepartamentos();
    this.obtienePaises();
  }


  getDepartamentos() {

   // let user=JSON.parse(localStorage.getItem('usuario'));

   // if (user.tipousuario==='super usuario'){
    this.Data.getAll('/departamentos')
      .subscribe(res => {
          this.TUser = res;
          this.Bloq = false;
        }, err => console.error(err));
   // }else{
     /*   this.Data.getOne(user.cproy, '/departamentosR')
        .subscribe(res => {
          this.TDepartamentos = res;
          this.Bloq = true;
          }, err => console.error(err));
        }*/
  }


  AgregarValor(){

    this.Data.addNewData(this.user, '/departamentos')
       .subscribe(
         res => {

this.getDepartamentos();
      //     this.router.navigate(['/principal/inicio']);
         },
         err => console.error(err)
       );

       delete this.user.cdepa;
  }

  EliminarData(id: number){

    this.Data.deleteData(id, '/departamentos')
      .subscribe(
        res => {
          this.getDepartamentos();
        },
        err => console.error(err)
      );
  }

  obtienePaises() {
    this.Data.getAll('/paises')
    .subscribe(res => {
      this.TPaises = res;
      }, err => console.error(err));

  }


}
