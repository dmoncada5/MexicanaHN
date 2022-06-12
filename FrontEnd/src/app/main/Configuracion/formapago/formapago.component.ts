import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPagosService } from '../formapagos/formapagos.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';



@Component({
  selector: 'app-formapago',
  templateUrl: './formapago.component.html',
  styleUrls: ['./formapago.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class FormaPagoComponent implements OnInit {
    fpago: any = {
        cformap: null,
        ccomp: null,
        forma_pago: null,
        observaciones: null,
        estado: null
      };
      pageType: string;
      formapagoForm: FormGroup;
      company: any = [];
      nombreFormaPago:any;
      constructor(private formapagosService: FormaPagosService, 
                  private activatedRoute: ActivatedRoute,
                  private _formBuilder: FormBuilder,
                  private _matSnackBar: MatSnackBar,
                  private router: Router, ) {
                    this.formapagoForm = _formBuilder.group({
                        cformap: ['', ],
                        ccomp: ['', Validators.required],
                        forma_pago: ['', Validators.required],
                        observaciones: ['', Validators.required],
                        estado: ['', Validators.required]
                    
                    });
                
    
                   }

  ngOnInit(): void {
    this.getCompany();
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

}else
    if (params.id) {
this.formapagosService.getFPagoOne('/formapagos/edit/', params.id).subscribe(
  (res) => {
  this.fpago = res[0];
  this.formapagoForm.controls.cformap.setValue(this.fpago['cformap']);
  this.formapagoForm.controls.ccomp.setValue(this.fpago['ccomp']);
  this.formapagoForm.controls.forma_pago.setValue(this.fpago['forma_pago']);
  this.formapagoForm.controls.observaciones.setValue(this.fpago['observaciones']);
  this.formapagoForm.controls.estado.setValue(this.fpago['estado']);
  this.nombreFormaPago=this.fpago['forma_pago'];
  }
)

    }
  }


  addFPago(){ 
    const data = this.formapagoForm.getRawValue();

 //  data.handle = FuseUtils.handleize(data.cpais);


    this.formapagosService.addFPago(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Forma de PAgo added', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
  
           this.router.navigate(['configuracion/formapagos']);
       }).catch((err) => {console.log(err)});
       

 }
 saveFPago(){
   const data = this.formapagoForm.getRawValue();
   data.handle = FuseUtils.handleize(data.cformap);


   this.formapagosService.saveFPago(data)
       .then((res) => {

           // Trigger the subscription with new data


           // Show the success message
           this._matSnackBar.open('Forma de Pago saved', 'OK', {
               verticalPosition: 'top',
               duration        : 2000
           });

           // Change the location with new one
           this.router.navigate(['configuracion/formapagos']);
       });

 }



 getCompany(){
    this.formapagosService.getAll('/company').subscribe(
      (res) => {
 this.company = res;
      }
    )
  }
 

}
