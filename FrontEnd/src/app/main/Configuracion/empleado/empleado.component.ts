import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { EmpleadosService } from '../empleados/empleados.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class EmpleadoComponent implements OnInit {
  empleado: any = {
    cemp: null,
    ccomp: null,
    csuc: null,
    cpais: null,
    //cdepa: null,
  //  cmuni: null,
   careat: null,
    nombres: null,
    apellidos: null,
    identidad: null,
    genero: null,
    rtn: null,
    edad: null,
    tipo_sangre: null,
    direccion: null,
    telefono: null,
    celular: null,
    correo: null,
    observaciones: null,
    fecha_ingreso: null,
    estado: null
    
  };
  pageType: string;
  empleadoForm: FormGroup;
  company: any = [];
  paises: any = [];
  sucursal: any = []; 
  area: any = [];
  constructor(private empleadosService: EmpleadosService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router) { 
      this.empleadoForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]
        cemp: ['', ],
        ccomp: ['', Validators.required],
        csuc: ['', Validators.required],
        cpais: ['', Validators.required],
        careat: ['', Validators.required],
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        identidad: ['', Validators.required],
        genero: ['', Validators.required],
        rtn: ['', Validators.required],
        edad: ['', Validators.required],
        tipo_sangre: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        celular: ['', Validators.required],
        correo: ['', Validators.required],
        observaciones: ['', ],
        fecha_ingreso: ['', Validators.required],
        estado: ['', Validators.required]   
      });
    }

  ngOnInit(): void {
    this.getCompany();
    this.getPais();
    this.getAreaT();
    this.getSucursal();
    
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

}else
    if (params.id) {
this.empleadosService.getEmpleadoOne('/empleados/edit/', params.id).subscribe(
  (res) => {
  this.empleado = res[0];
  this.empleadoForm.controls.cemp.setValue(this.empleado['cemp']);
  this.empleadoForm.controls.ccomp.setValue(this.empleado['ccomp']);
  this.empleadoForm.controls.csuc.setValue(this.empleado['csuc']);
  this.empleadoForm.controls.cpais.setValue(this.empleado['cpais']);
  this.empleadoForm.controls.careat.setValue(this.empleado['careat']);
  this.empleadoForm.controls.nombres.setValue(this.empleado['nombres']);
  this.empleadoForm.controls.apellidos.setValue(this.empleado['apellidos']);
  this.empleadoForm.controls.identidad.setValue(this.empleado['identidad']);
  this.empleadoForm.controls.genero.setValue(this.empleado['genero']);
  this.empleadoForm.controls.rtn.setValue(this.empleado['rtn']);
  this.empleadoForm.controls.edad.setValue(this.empleado['edad']);
  this.empleadoForm.controls.tipo_sangre.setValue(this.empleado['tipo_sangre']);
  this.empleadoForm.controls.direccion.setValue(this.empleado['direccion']);
  this.empleadoForm.controls.telefono.setValue(this.empleado['telefono']);
  this.empleadoForm.controls.celular.setValue(this.empleado['celular']);
  this.empleadoForm.controls.correo.setValue(this.empleado['correo']);
  this.empleadoForm.controls.observaciones.setValue(this.empleado['observaciones']);
  this.empleadoForm.controls.fecha_ingreso.setValue(this.empleado['fecha_ingreso']);
  this.empleadoForm.controls.estado.setValue(this.empleado['estado']);
    
  });

    }
  }
 
  addEmpleado(){ 
    const data = this.empleadoForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.empleadosService.addEmpleado(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Empleado added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });  

           // Change the location with new one
  
           this.router.navigate(['configuracion/empleados']);
       }).catch((err) => {console.log(err);});
       

 }
 saveEmpleado(){
   const data = this.empleadoForm.getRawValue();
   data.handle = FuseUtils.handleize(data.cemp);


   this.empleadosService.saveEmpleado(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Empleado saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/empleados']);
       });

 }

 getCompany(){
   this.empleadosService.getAll('/company').subscribe(
     (res) => {
this.company = res;
     }
   );
 }

 getPais(){
   this.empleadosService.getAll('/paises').subscribe(
     (res) => {
this.paises = res;
     }
   );
 }

 getSucursal(){
  this.empleadosService.getAll('/sucursales').subscribe(
    (res) => {
this.sucursal = res;
    }
  );
}

getAreaT(){
  this.empleadosService.getAll('/areatrabajo').subscribe(
    (res) => {
this.area = res;
    }
  );
}

}
