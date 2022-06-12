import { FuseUtils } from '../../../@fuse/utils';

export class Contact
{
    csocio:string; 
    nombre:string; 
    ccomp:number; 
    ccate:number;  
    cpais:number; 
    grupoid:number;
    rtn:string; 
    direccion:string; 
    telefono:string; 
    celular:string; 
    correo:string; 
    sitio_web:string; 
    contacto:string;  
    observaciones:string; 
    fecha_creacion:Date; 
    estado:string;
    codlista:number;


    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
this.csocio=contact.csocio||'';
this.nombre=contact.nombre||'';
this.ccomp=contact.ccomp||'';
this.ccate=contact.ccate||'';
this.cpais=contact.cpais||'';
this.grupoid=contact.grupoid||'';
this.rtn=contact.rtn||'';
this.direccion=contact.direccion||'';
this.telefono=contact.telefono||'';
this.celular=contact.celular||'';
this.correo=contact.correo||'';
this.sitio_web=contact.sitio_web||'';
this.contacto=contact.contacto||'';
this.observaciones=contact.observaciones||'';
this.fecha_creacion=contact.fecha_creacion||'';
this.estado=contact.estado||'';
this.codlista=contact.codlista||'';
        }
    }
}
