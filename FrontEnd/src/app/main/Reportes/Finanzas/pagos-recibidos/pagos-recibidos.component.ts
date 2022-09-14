import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { ReportesService } from '../../reportes.service';

@Component({
  selector: 'app-pagos-recibidos',
  templateUrl: './pagos-recibidos.component.html',
  styleUrls: ['./pagos-recibidos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagosRecibidosComponent implements OnInit {
datos:any;
desde:any;
hasta: any;
totalEfectivo:number=0;
totalTarjeta:number=0;
totalCheque:number=0;
totalTrans:number=0;
totalpagos:number=0;
  constructor(private rpt:ReportesService) { }

  ngOnInit(): void {


  }
  getFormattedDate( originalDate ){
    originalDate=new Date(originalDate);
 return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}

report(){
  this.totalpagos=0;
  this.rpt.getpagoRecibidos('/Rfinanzas/pagosRecibidos',this.desde,this.hasta).subscribe(
    (res)=>{
  this.datos=res;

  for(let i=0; i<this.datos.length;i++){
    this.totalEfectivo+=this.datos[i]["Efectivo"];
    this.totalTarjeta+=this.datos[i]["Tarjeta"];
    this.totalCheque+=this.datos[i]["Cheque"];
    this.totalTrans+=this.datos[i]["Transferencia"];
  }
  this.totalpagos=this.totalEfectivo+this.totalTarjeta+this.totalCheque+this.totalTrans;
    },
    (err)=>{console.log(err);}
  );
}
}
