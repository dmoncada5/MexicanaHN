import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {PrintNotaCreditoService} from '../print-notacredito.service'
import { ActivatedRoute, Router } from '@angular/router';
import { CompanysService } from 'app/main/Configuracion/companys/companys.service';

@Component({
  selector: 'app-printnotacredito',
  templateUrl: './printnotacredito.component.html',
  styleUrls: ['./printnotacredito.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrintnotacreditoComponent implements OnInit {
  Encabezado:any={
    TotalDoc:0
  };
  Detalle:any;
  doc:any={
DocNum:''
  }
  pageType:any;
  company :any={
    empresa:null
  }
  constructor(private prtservice: PrintNotaCreditoService,
              private activatedRoute: ActivatedRoute,
              private companyServices:  CompanysService
              ) { 
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
this.doc.DocNum=this.pageType; 
console.log(this.pageType)
    this.prtservice.getNotaCredito('/notacredito/Encabezado',this.doc).then(
      res=>{
        this.Encabezado=res[0];
        console.log('detalle',this.Encabezado)
      }
    );
    this.prtservice.getDetalle('/notacredito/Detalle',this.doc.DocNum).subscribe(
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
