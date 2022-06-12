import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ExpedientesService } from '../expedientes/expedientes.service';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations,
  template: ` <app-citas [valor]="Expe"></app-citas>`,
})
export class ExpedienteComponent implements OnInit {
  Expe:any;
  expediente: any = {
    cexp: 0,
    ccomp: 0,
    csuc: 0,
    name: null,
    producto: null,
    pesoini: null,
    pesoact: null,  
    talla: null,
    tallacms: null,
    imc: null,
    ptr: null,
    areagrasa: null,
    areamusc: null,
    estado: null,
    fechacreacion: null ,
    birthdate:null,
    telefono:null,
    correo:null
    
  };
nombre:any;
  pageType: string;
  expedienteForm: FormGroup;
  company: any = [];
  sucursal: any = [];
  socionegocio: any = [];

  constructor(private expedientesService: ExpedientesService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router) { 
      this.expedienteForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]

        cexp: [0, ],
        ccomp: [0, Validators.required],
        csuc: [0, Validators.required],
        name: [, Validators.required],
       pesoini: ['', Validators.required],    
        talla: ['', Validators.required],
        tallacms: ['', Validators.required],
        imc: ['', Validators.required],
        ptr: ['', Validators.required],
        areagrasa: ['', Validators.required],
        areamusc: ['', Validators.required],        
        estado: ['', Validators.required],
        fechacreacion: ['', Validators.required],
        birthdate: ['', Validators.required],
        telefono: ['', Validators.required],
        correo: ['', Validators.required]
        

      });
    }

  ngOnInit(): void {
    this.getCompany();
    this.getSucursal();
    this.getUserData1();

    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

}else
    if (params.id) {
      this.Expe=params.id;
this.expedientesService.getExpedienteOne('/expediente/edit/', params.id).subscribe(
  (res) => { 

  this.expediente = res[0];

  this.expedienteForm.controls.cexp.setValue(this.expediente['cexp']);
  this.expedienteForm.controls.ccomp.setValue(this.expediente['ccomp']);
  this.expedienteForm.controls.csuc.setValue(this.expediente['csuc']);
  this.expedienteForm.controls.name.setValue(this.expediente['name']);

  this.nombre=res[0]['name'];

  // this.expedienteForm.controls.producto.setValue(this.expediente['producto']);
  this.expedienteForm.controls.pesoini.setValue(this.expediente['pesoini']);
  // this.expedienteForm.controls.pesoact.setValue(this.expediente['pesoact']);
  this.expedienteForm.controls.talla.setValue(this.expediente['talla']);
  this.expedienteForm.controls.tallacms.setValue(this.expediente['tallacms']);
  this.expedienteForm.controls.imc.setValue(this.expediente['imc']);
  this.expedienteForm.controls.ptr.setValue(this.expediente['ptr']);
  this.expedienteForm.controls.areagrasa.setValue(this.expediente['areagrasa']);
  this.expedienteForm.controls.areamusc.setValue(this.expediente['areamusc']);
  this.expedienteForm.controls.estado.setValue(this.expediente['estado']);
  this.expedienteForm.controls.fechacreacion.setValue(this.expediente['fechacreacion']);
  this.expedienteForm.controls.birthdate.setValue(this.expediente['birthdate']);
  this.expedienteForm.controls.telefono.setValue(this.expediente['telefono']);
  this.expedienteForm.controls.correo.setValue(this.expediente['correo']);
    
  });

    }
  }

  addExpediente(){ 
    const data = this.expedienteForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.expedientesService.addExpediente(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Expediente added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/expedientes']);
       }).catch((err) => {console.log(err);});
       

 }
 saveExpediente(){
   const data = this.expedienteForm.getRawValue();
   //data.handle = FuseUtils.handleize(data.cexp);


   this.expedientesService.saveExpediente(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Expediente  saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/expedientes']);
       });

 }

 getCompany(){
   this.expedientesService.getAll('/company').subscribe(
     (res) => {
this.company = res;
     }
   );
 }

 getSucursal(){
   this.expedientesService.getAll('/sucursales').subscribe(
     (res) => {
this.sucursal = res;
     }
   );
 }

 getUserData1(){
  this.expedientesService.getAll('/socios').subscribe(
    (res) => {
this.socionegocio = res;
    }
  );
}

}
