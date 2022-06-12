import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CompanysService } from '../companys/companys.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class CompanyComponent implements OnInit {
  pageType: string;
  companyForm: FormGroup;
  departamentos:any=[];
  municipios:any=[];
  paises:any=[];

company:any={
  ccomp:null, 
  cpais:null, 
  departamento:null, 
  municipio:null, 
  empresa:null, 
  empresa_sociedad:null, 
  rtn:null, 
  sucursales:null, 
  direccion:null, 
  telefono:null, 
  celular:null, 
  correo:null, 
  sitio_web:null, 
  fecha_creacion:new Date(), 
  estado:null
}

 


  constructor(private _formBuilder: FormBuilder,
    private companyServices:CompanysService, 
   private activatedRoute: ActivatedRoute,
   private _matSnackBar: MatSnackBar,
   private router: Router,) {  this.companyForm = this.createProductForm();}

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;
    this.pageType=params.id;
    console.log(this.pageType)
    this.getDepartamentos();
    this.getMunicipios();
    this.getPaises();
    // this.getCompany();
    // this.getSucursal();
if(params.id=='new'){

}else
    if (params.id) {
this.companyServices.getCompanyOne("/company/edit/",params.id).subscribe(
  (res)=>{
  
  this.company=res[0];

  this.companyForm = this.createProductForm();

  }
)

    }

  }


  getDepartamentos(){
    this.companyServices.getAll('/departamentos').subscribe(
      (res)=>{
this.departamentos=res;

      }
    )
  }
  getMunicipios(){
    this.companyServices.getAll('/municipios').subscribe(
      (res)=>{
this.municipios=res;

      }
    )
  }
  getPaises(){
    this.companyServices.getAll('/paises').subscribe(
      (res)=>{
this.paises=res;

      }
    )
  }

  createProductForm(): FormGroup
    {
      return this._formBuilder.group({
        ccomp:[this.company.ccomp],
        cpais:[this.company.cpais, Validators.required],
        cdepa:[this.company.cdepa ],
        cmuni:[this.company.cmuni],
        empresa:[this.company.empresa, Validators.required],
        empresa_sociedad:[this.company.empresa_sociedad, Validators.required],
        rtn:[this.company.rtn, Validators.required],
        sucursales:[this.company.sucursales, Validators.required],
        direccion:[this.company.direccion, Validators.required],
        telefono:[this.company.telefono, Validators.required],
        celular:[this.company.celular],
        correo:[this.company.correo, Validators.required],
        sitio_web:[this.company.sitio_web],
        fecha_creacion:[this.company.fecha_creacion, Validators.required],
        estado:[this.company.estado, Validators.required]
    });
}
  addCompany(){
    const data = this.companyForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.cnum);
 
  
     this.companyServices.addCompany(data)
         .then((res) => {
              // Trigger the subscription with new data
  
 
             // Show the success message
             this._matSnackBar.open('Compañia added', 'OK', {
                 verticalPosition: 'top',
                 duration        : 2000
             });
 
             // Change the location with new one
    
             this.router.navigate(['configuracion/companys']);
         }).catch((err)=>{console.log(err)});
   }

  saveCompany(){
    const data = this.companyForm.getRawValue();
    data.handle = FuseUtils.handleize(data.ccomp);

 
    this.companyServices.saveCompany(data)
        .then((res) => {

            // Trigger the subscription with new data
 

            // Show the success message
            this._matSnackBar.open('Numeracion saved', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

            // Change the location with new one
            this.router.navigate(['configuracion/companys']);
        });

   }

}
