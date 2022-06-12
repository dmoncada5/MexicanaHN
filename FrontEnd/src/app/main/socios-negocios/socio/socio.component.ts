import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { SocioService } from '../../../main/socios-negocios/socios/socio.service';
import { FuseUtils } from '../../../../@fuse/utils';


@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.scss']
})
export class SocioComponent implements OnInit {
  pais: any={
    cpais:null,
    pais:null,
    estado:null
  };
  pageType: string;
  socioForm: FormGroup;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router,) { }

  ngOnInit(): void {
  }


  addPais(){ 
    const data = this.socioForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


  //  this.SocioService.addPais(data)
  //      .then((res) => {

  //          // Trigger the subscription with new data


  //          // Show the success message
  //          this._matSnackBar.open('Product added', 'OK', {
  //              verticalPosition: 'top',
  //              duration        : 2000
  //          });

  //          // Change the location with new one
  
  //          this.router.navigate(['configuracion/paises']);
  //      }).catch((err)=>{console.log(err)});
       

 }
 savePais(){
   const data = this.socioForm.getRawValue();
   data.handle = FuseUtils.handleize(data.cpais);


  //  this.paisesService.savePais(data)
  //      .then((res) => {

  //          // Trigger the subscription with new data


  //          // Show the success message
  //          this._matSnackBar.open('Product saved', 'OK', {
  //              verticalPosition: 'top',
  //              duration        : 2000
  //          });

  //          // Change the location with new one
  //          this.router.navigate(['configuracion/paises']);
  //      });

 }


}
