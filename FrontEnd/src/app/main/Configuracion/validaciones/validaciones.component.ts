import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { id } from '@swimlane/ngx-charts';
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

  public companies: any[] = [
    { "id": 0, "name": "Available" },
    { "id": 1, "name": "Ready" },
    { "id": 2, "name": "Started" }
];
//  areatrabajoForm: FormGroup;
//   company:any;  
  TValidas:any[]=[];

  constructor(private ValidacionesService: ValidacionesService, 
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router,) { 
      this.getValidaciones();
    }

  ngOnInit(): void {

   


  }


  update(){
    const data = this.TValidas;

    //  data.handle = FuseUtils.handleize(data.cpais);
   
    console .log('uuseee',data)

    for (let i=0;i<this.TValidas.length;i++){

      this.ValidacionesService.update(this.TValidas[i])
      .then((res) => {

          // Trigger the subscription with new data


          // Show the success message
          this._matSnackBar.open('Configuraciones Guardadas', 'OK', {
              verticalPosition: 'top',
              duration        : 2000
          });

          // Change the location with new one
 
       //   this.router.navigate(['configuracion/usuarios']);
      }).catch((err) => {console.log(err);});

    }
   
          
  }
  toggleCompleted(event,id): void
  {

 
 let bit=0;
if(event.currentTarget.checked){
  bit=1
}else{
  bit=0;
}
      const valor=this.TValidas.find((todo)=>{
        return todo.validacionid==id;
      })
      valor['valido']=bit;

  }
 
  saveAreaT(){}

 getValidaciones(){
   this.ValidacionesService.getAll('/validaciones').subscribe(
     (res:any[]) => {
this.TValidas = res;
console.log(this.TValidas)
     }
   );
 
 }


}
