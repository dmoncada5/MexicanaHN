import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReportesService } from '../../reportes.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GastosComponent implements OnInit {
  datos:any;
  desde:any;
  hasta: any;
  totalEfectivo:number=0;
  constructor(private rpt:ReportesService) { }

  ngOnInit(): void {
  }

  getFormattedDate( originalDate ){
    originalDate=new Date(originalDate);
 return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}

report(){
  this.totalEfectivo=0;
  this.rpt.getpagoRecibidos('/Rfinanzas/gastos',this.desde,this.hasta).subscribe(
    (res)=>{
  this.datos=res;
  for(let i=0; i<this.datos.length;i++){
    this.totalEfectivo+=this.datos[i]["monto"];

  }

    },
    (err)=>{console.log(err);}
  );
}
}