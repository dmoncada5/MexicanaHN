import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ReportesService } from '../../reportes.service';

@Component({
  selector: 'app-estadisco-items',
  templateUrl: './estadisco-items.component.html',
  styleUrls: ['./estadisco-items.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class EstadiscoItemsComponent implements OnInit {
  datos:any;
  desde:any;
  hasta: any;
  totalVendidos:number=0;

constructor(private rpt:ReportesService){

}
  ngOnInit() {


  }


  getFormattedDate( originalDate ){
    originalDate=new Date(originalDate);
 return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}

report(){
  this.rpt.getarticulosVendidos('/Rfinanzas/articulosVendidos',this.desde,this.hasta).subscribe(
    (res)=>{
      this.totalVendidos=0;
  this.datos=res;

  for(let i=0; i<this.datos.length;i++){
    this.totalVendidos+=this.datos[i]["Vendidas"];

  }
 
    },
    (err)=>{console.log(err);}
  );
}
}
