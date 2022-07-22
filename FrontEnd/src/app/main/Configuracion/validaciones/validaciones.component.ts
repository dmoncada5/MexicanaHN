import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { ValidacionesService} from './validaciones.service'

@Component({
  selector: 'app-validaciones',
  templateUrl: './validaciones.component.html',
  styleUrls: ['./validaciones.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ValidacionesComponent implements OnInit {
todo: any={    
  completed: false
}
  areatrabajo: any={
    careat:null,
    ccomp:null,
    area:null,    
    estado:null
  };
  pageType: string;
  areatrabajoForm: FormGroup;
  company:any;  
  
  constructor(private ValidacionesService: ValidacionesService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router,) { 
      this.areatrabajoForm = _formBuilder.group({
        careat: ['',],
        ccomp: ['', Validators.required],
        area: ['', Validators.required],      
        estado: ['', Validators.required]
      
      });
    }

  ngOnInit(): void {
    this.getCompany();
   
    const params = this.activatedRoute.snapshot.params;
    this.pageType= params.id;
    if(params.id=='new'){

}else
    if (params.id) {
// this.ValidacionesService.getAreaTOne("/areatrabajo/edit/",params.id).subscribe(
//   (res)=>{
//   this.areatrabajo=res[0];
//   this.areatrabajoForm.controls.careat.setValue(this.areatrabajo["careat"]);
//   this.areatrabajoForm.controls.ccomp.setValue(this.areatrabajo["ccomp"]);
//   this.areatrabajoForm.controls.area.setValue(this.areatrabajo["area"]);
//   this.areatrabajoForm.controls.estado.setValue(this.areatrabajo["estado"]);
//   }
// )

    }
  }
  toggleCompleted(event): void
  {
      event.stopPropagation();
      this.todo.toggleCompleted();
     // this._todoService.updateTodo(this.todo);
  }
  addAreaT(){ 
//     const data = this.areatrabajoForm.getRawValue();

//  //  data.handle = FuseUtils.handleize(data.cpais);


//     this.areatrabajosService.addAreaT(data)
//        .then((res) => {

//            // Trigger the subscription with new data


//            // Show the success message
//            this._matSnackBar.open('Area de Trabajo added', 'OK', {
//                verticalPosition: 'top',
//                duration        : 2000
//            });

//            // Change the location with new one
  
//            this.router.navigate(['configuracion/areatrabajos']);
//        }).catch((err) => {console.log(err);});
       

 }
 saveAreaT(){
  //  const data = this.areatrabajoForm.getRawValue();
  //  data.handle = FuseUtils.handleize(data.careat);


  //  this.areatrabajosService.saveAreaT(data)
  //      .then((res) => {

  //          // Trigger the subscription with new data

  //          // Show the success message
  //          this._matSnackBar.open('Area de Trabajo saved', 'OK', {
  //              verticalPosition: 'top',
  //              duration        : 2000
  //          });

  //          // Change the location with new one
  //          this.router.navigate(['configuracion/areatrabajos']);
  //      });

 }

 getCompany(){
//    this.areatrabajosService.getAll('/company').subscribe(
//      (res) => {
// this.company = res;
//      }
//    );
//  
 }


}
