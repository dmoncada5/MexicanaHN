import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReportesService } from '../../reportes.service';

@Component({
  selector: 'app-reporteFacturas',
  templateUrl: './reporteFacturas.component.html',
  styleUrls: ['./reporteFacturas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class reporteFacturasComponent implements OnInit {
  datos:any;
  desde:any;
  hasta: any;
  totalEfectivo:number=0;
  totalSubEXENTO:number=0;
  totalSubGRAVADO:number=0;
 
 
  totalISV15:number=0;
  totalISV18:number=0;
  constructor(private rpt:ReportesService) { }

  ngOnInit(): void {
  }

  getFormattedDate( originalDate ){
    originalDate=new Date(originalDate);
 return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}

report(){
  this.totalEfectivo=0;
  this.totalSubGRAVADO=0;
  this.totalSubEXENTO=0;
  this.totalISV15=0;
  this.totalISV18=0;

  this.rpt.getpagoRecibidos('/Rfinanzas/reporteFacturas',this.desde,this.hasta).subscribe( 
    (res)=>{
  this.datos=res;
  for(let i=0; i<this.datos.length;i++){
    this.totalEfectivo+=this.datos[i]["TOTAL"];
    this.totalISV15+=this.datos[i]["ISV15"];
    this.totalSubGRAVADO+=this.datos[i]["GRAVADO"];
    this.totalSubEXENTO+=this.datos[i]["EXCENTO"];
    this.totalISV18+=this.datos[i]["ISV18"];
  }

    },
    (err)=>{console.log(err);}
  );
}
}