import { Component, OnInit,ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../socio.model';
import { SociosService } from '../socios.service';

@Component({
  selector: 'app-socio-form',
  templateUrl: './socio-form.component.html',
  styleUrls: ['./socio-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocioFormComponent {
    action: string;
    contact: Contact;
    contactForm: FormGroup;
    dialogTitle: string;
    company:any;
    onlyRead:boolean;
    categorias:any;
    grupos:any;
    listas:any
    tipoCat:number;
    constructor(
    public matDialogRef: MatDialogRef<SocioFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private sociosService:SociosService
    ) { 
     
      this.getCompany();
      this.getCategorias();
      this.getGrupos();
      this.getListaPrice();
 
   // Set the defaults
   this.action = _data.action;
 
   if ( this.action === 'edit' )
   {
       this.onlyRead=true;
       this.dialogTitle = 'Editar Socio';
      
       this.contact = _data.contact;
 
if(this.contact.ccate===1){
  this.tipoCat=1;
}
     
    }
   else
   {
    this.onlyRead=false;
       this.dialogTitle = 'Nuevo Socio';
       this.contact = new Contact({});
   }
   this.contactForm = this.createContactForm();
  }

  getCompany(){
    this.sociosService.getAll('/company').subscribe(
      (res)=>{
this.company=res;
             }
    )
  }
  getCategorias(){
    this.sociosService.getAll('/categorias').subscribe(
      (res)=>{
this.categorias=res;
             }
    )
  }
  categoria(event){

this.tipoCat=event;
  }
  getListaPrice(){
    this.sociosService.getAll('/listaprecios').subscribe(
      (res)=>{
this.listas=res;
             }
    )
  }
  getGrupos(){
    this.sociosService.getAll('/grupos').subscribe(
      (res)=>{
this.grupos=res;
             }
    )
  }

  createContactForm(): FormGroup
  {
      return this._formBuilder.group({
          csocio : [this.contact.csocio],
          nombre : [this.contact.nombre,Validators.required],
          ccomp : [this.contact.ccomp,Validators.required],
          ccate : [this.contact.ccate],
          cpais : [this.contact.cpais],
          grupoid : [this.contact.grupoid,Validators.required],
          rtn : [this.contact.rtn],
          direccion : [this.contact.direccion],
          telefono : [this.contact.telefono],
          celular : [this.contact.celular],
          correo : [this.contact.correo],
          sitio_web : [this.contact.sitio_web],
          contacto : [this.contact.contacto],
          observaciones : [this.contact.observaciones],
          fecha_creacion : [this.contact.fecha_creacion],
          estado : [this.contact.estado],
          codlista:[this.contact.codlista],

      });
  }
}
