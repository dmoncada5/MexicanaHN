import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { SucursalesService } from '../sucursales/sucursales.service';


@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html', 
  styleUrls: ['./sucursal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class SucursalComponent implements OnInit {
   sucursal: any = {
        csuc: null,
        ccomp: null,
        cpais: null,
        numsuc: null,
        cdepa: null,
        cmuni: null,
        sucursal: null,
        direccion: null,
        telefono: null,
        celular: null,
        correo: null,
        responsable: null,
        fecha_creacion: new Date(),
        estado: null
        
      };
      pageType: string;
      sucursalForm: FormGroup;
      company: any = [];
      departamentos:any=[];
      municipios:any=[];
      paises: any = [];
  constructor(private sucursalesService: SucursalesService, 
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _matSnackBar: MatSnackBar,
              private router: Router) {
      this.sucursalForm = _formBuilder.group({
        // cpais: ['',],
        // pais: ['', Validators.required],
        // estado: ['', Validators.required]

        csuc: ['', ],
        ccomp: ['', Validators.required],
        cpais: ['', Validators.required],
        numsuc: ['', Validators.required],
        cdepa: ['', Validators.required],
        cmuni: ['', Validators.required],
        sucursal: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        celular: ['', Validators.required],
        correo: ['', Validators.required],
        responsable: ['', Validators.required],
        fecha_creacion: [new Date(), Validators.required],
        estado: ['', Validators.required]   
      });
    }
  ngOnInit(): void {
    this.getCompany();
    this.getPais();
    this.getDepartamentos();
    this.getMunicipios();
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
    if (params.id == 'new'){

}else
    if (params.id) {
this.sucursalesService.getSucursalOne('/sucursales/edit/', params.id).subscribe(
  (res) => {
  this.sucursal = res[0];
  this.sucursalForm.controls.csuc.setValue(this.sucursal['csuc']);
  this.sucursalForm.controls.ccomp.setValue(this.sucursal['ccomp']);
  this.sucursalForm.controls.cpais.setValue(this.sucursal['cpais']);
  this.sucursalForm.controls.numsuc.setValue(this.sucursal['numsuc']);
  this.sucursalForm.controls.cdepa.setValue(this.sucursal['cdepa']);
  this.sucursalForm.controls.cmuni.setValue(this.sucursal['cmuni']);
  this.sucursalForm.controls.sucursal.setValue(this.sucursal['sucursal']);
  this.sucursalForm.controls.direccion.setValue(this.sucursal['direccion']);
  this.sucursalForm.controls.telefono.setValue(this.sucursal['telefono']);
  this.sucursalForm.controls.celular.setValue(this.sucursal['celular']);
  this.sucursalForm.controls.correo.setValue(this.sucursal['correo']);
  this.sucursalForm.controls.responsable.setValue(this.sucursal['responsable']);
  this.sucursalForm.controls.fecha_creacion.setValue(this.sucursal['fecha_creacion']);
  this.sucursalForm.controls.estado.setValue(this.sucursal['estado']);
    
  });

    }
  }

  addSucursal(){ 
     const data = this.sucursalForm.getRawValue();

  //  data.handle = FuseUtils.handleize(data.cpais);

 
     this.sucursalesService.addSucursal(data)
        .then((res) => {

            // Trigger the subscription with new data
 

            // Show the success message
            this._matSnackBar.open('Sucursal added', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

            // Change the location with new one
   
            this.router.navigate(['configuracion/sucursales']);
        }).catch((err) => {console.log(err);});
        

  }
  saveSucursal(){
    const data = this.sucursalForm.getRawValue();
    data.handle = FuseUtils.handleize(data.csuc);

 
    this.sucursalesService.saveSucursal(data)
        .then((res) => {

            // Trigger the subscription with new data
 
            // Show the success message
            this._matSnackBar.open('Sucursal saved', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

            // Change the location with new one
            this.router.navigate(['configuracion/sucursales']);
        });

  }

  getCompany(){
    this.sucursalesService.getAll('/company').subscribe(
      (res) => {
this.company = res;
      }
    );
  }

  getPais(){
    this.sucursalesService.getAll('/paises').subscribe(
      (res) => {
this.paises = res;
      }
    );
  }


  getDepartamentos(){
    this.sucursalesService.getAll('/departamentos').subscribe(
      (res)=>{
       
        this.departamentos=res;

      }
    )
  }
  getMunicipios(){
    this.sucursalesService.getAll('/municipios').subscribe(
      (res)=>{

        this.municipios=res;

      }
    )
  }

}
