import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ReportesService} from '../../reportes.service';
@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrls: ['./cierre.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CierreComponent implements OnInit {
  desde:any;
  hasta: any;
  datos:any;
  totalpagado:number=0;
  constructor(private ReportesService: ReportesService,) { }

  ngOnInit(): void {
  }
  report(){
    this. datos=0;
    this.totalpagado=0;
    this.ReportesService.CierreDiario('/Rfinanzas/CierreDiario',this.desde,this.hasta).subscribe(
      (res)=>{
        
       this. datos=res;
       for(let i=0; i<this.datos.length;i++){
      
        this.totalpagado+=this.datos[i]["Total"];
      }

      }
    )


  }
}
