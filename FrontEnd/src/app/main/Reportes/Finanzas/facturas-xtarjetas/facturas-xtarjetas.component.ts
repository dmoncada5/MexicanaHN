import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReportesService } from '../../reportes.service';
@Component({
  selector: 'app-facturas-xtarjetas',
  templateUrl: './facturas-xtarjetas.component.html',
  styleUrls: ['./facturas-xtarjetas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FacturasXTarjetasComponent implements OnInit {
  datos:any;
  desde:any;
  hasta: any;
  totalTarjeta:number=0;
  constructor(private rpt:ReportesService) { }

  ngOnInit(): void {
  }
  getFormattedDate( originalDate ){
    originalDate=new Date(originalDate);
 return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}

report(){
  this.rpt.getpagoRecibidos('/Rfinanzas/FacturaXTarjeta',this.desde,this.hasta).subscribe(
    (res)=>{
      this.totalTarjeta=0;
  this.datos=res;
  for(let i=0; i<this.datos.length;i++){
    this.totalTarjeta+=this.datos[i]["totalTarjeta"];
  }

    },
    (err)=>{console.log(err);}
  );
}
}
