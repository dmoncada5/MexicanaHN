import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {PrintCotizacionService} from '../print-cotizacion.service'
import { ActivatedRoute, Router } from '@angular/router';
import { CompanysService } from 'app/main/Configuracion/companys/companys.service';
@Component({
  selector: 'app-print-cotizacion',
  templateUrl: './print-cotizacion.component.html',
  styleUrls: ['./print-cotizacion.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrintCotizacionComponent implements OnInit {
  Encabezado:any= {
  
    TotalDoc:0
  };
  Detalle:any={};
  doc:any={
DocNum:''
  }
  pageType:any;

  company:any={
empresa:null
  }
  constructor(private prtservice: PrintCotizacionService,
              private activatedRoute: ActivatedRoute,
              private companyServices:CompanysService
              ) { 
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
this.doc.DocNum=this.pageType;
console.log(this.pageType)
    this.prtservice.getCotizacion('/cotizacion/Encabezado',this.doc).then(
      res=>{
        this.Encabezado=res[0];
        console.log('detalle',this.Encabezado)
      }
    );
    this.prtservice.getDetalle('/cotizacion/Detalle',this.doc.DocNum).subscribe(
      (res)=>{
        this.Detalle=res;
    
      },
      (err)=>{console.log(err);}
    );
    

    this.companyServices.getCompanyOne("/company/edit/",1).subscribe(
      (res)=>{
      
      this.company=res[0];
    

    
      }
    )

  }

  ngOnInit(): void {



  }

}
