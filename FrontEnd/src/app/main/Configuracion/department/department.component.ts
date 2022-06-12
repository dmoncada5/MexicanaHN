import { Component, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DepartmentsService } from '../departments/departments.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class DepartmentComponent implements OnInit {
  department: any={
    cdepa:null,
    cpais:null,
    departamento:null,    
    estado:null
  };
  pageType: string;
  departmentForm: FormGroup;  

  paises:any=[];

  constructor(private _formBuilder: FormBuilder,
    private departmentsService: DepartmentsService, 
    private activatedRoute: ActivatedRoute,
    private _matSnackBar: MatSnackBar,
    private router: Router,) {
      // this.departmentForm = _formBuilder.group({
      //   cdepa: ['',],
      //   cpais: ['', Validators.required],
      //   departamento: ['', Validators.required],       
      //   estado: ['', Validators.required]
      
       

      // });

      this.departmentForm = this.createProductForm();

     }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.pageType= params.id;
    this.getPais(); 
    if(params.id=='new'){

}else
    if (params.id) {
this.departmentsService.getDepartamentoOne("/departamentos/edit/",params.id).subscribe(
  (res)=>{
  this.department=res[0];
  this.departmentForm = this.createProductForm();
  // this.departmentForm.controls.cdepa.setValue(this.department["cdepa"]);
  // this.departmentForm.controls.cpais.setValue(this.department["cpais"]);
  // this.departmentForm.controls.departamento.setValue(this.department["departamento"]);
  // this.departmentForm.controls.estado.setValue(this.department["estado"]);
  }
)

    }
  }
  getPais(){
    this.departmentsService.getAll('/paises').subscribe(
      (res) => {
 this.paises=res;
 console.log(res);
      }
    )
  }

  createProductForm(): FormGroup
    {
      return this._formBuilder.group({
        cdepa:[this.department.cdepa],
        cpais:[this.department.cpais, Validators.required],
        departamento:[this.department.departamento, Validators.required],
        estado:[this.department.estado, Validators.required]

   
    });
}

  addDepartamento(){ 
    const data = this.departmentForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.departmentsService.addDepartamento(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message 
           this._matSnackBar.open('Departamento added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/departments']);
       }).catch((err) => {console.log(err);});
       

 }
 saveDepartamento(){
   const data = this.departmentForm.getRawValue();
   data.handle = FuseUtils.handleize(data.cdepa);


   this.departmentsService.saveDepartamento(data)
       .then((res) => {

           // Trigger the subscription with new data

           // Show the success message
           this._matSnackBar.open('Departamento saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/departments']);
       });

 }




}
