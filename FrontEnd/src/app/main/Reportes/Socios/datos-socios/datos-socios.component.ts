import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ReportesService } from '../../reportes.service';


@Component({
  selector: 'app-datos-socios',
  templateUrl: './datos-socios.component.html',
  styleUrls: ['./datos-socios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatosSociosComponent implements OnInit {
  datos:any;
  desde:any;
  hasta: any;
  totalVendidos:number=0;
  cliente: boolean = true;
  proveedor:boolean=true;
 
  // cliente:boolean=false;
  

  categoria:any;
  bgrupos:any;

  // '/api/Rsocios/sociosCategoria'
constructor(private rpt:ReportesService){

}
  ngOnInit() {
this.rpt.getAll('/grupos/gr').subscribe(
  (res)=>{
    this.bgrupos=res;
  }
)

  }
  category(EVE){
    this.cliente = false;
    this.proveedor=false;
 
    this.rpt.getSociosGrupo("/Rsocios/sociosGrupo",EVE).subscribe(
      (res)=>{
        this.datos=res;
    
      }
    );



  }


  changeValueC(value) {
    this.cliente = true;
    this.proveedor=false;
    this.rpt.getSociosCategoria("/Rsocios/sociosCategoria",1).subscribe(
      (res)=>{
        this.datos=res;
    
      }
    );
}
changeValueP(value) {
  this.proveedor = true;
  this.cliente=false;
  this.rpt.getSociosCategoria("/Rsocios/sociosCategoria",2).subscribe(
    (res)=>{
      this.datos=res;
  
    }
  );
}

 
  
  getFormattedDate( originalDate ){
    originalDate=new Date(originalDate);
 return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}

}
