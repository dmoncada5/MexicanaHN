import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {PrintEntregaService} from '../print-entrega.service'
import { ActivatedRoute, Router } from '@angular/router';
import { CompanysService } from 'app/main/Configuracion/companys/companys.service';

@Component({
  selector: 'app-printentrega',
  templateUrl: './printentrega.component.html',
  styleUrls: ['./printentrega.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrintentregaComponent implements OnInit {
  Encabezado:any={
    TotalDoc:0
  };
  Detalle:any;
  doc:any={
DocNum:1
  }
  pageType:any;
  company:any={
    empresa:null,
  }
  constructor(private prtservice: PrintEntregaService,
              private activatedRoute: ActivatedRoute,
              private companyServices:  CompanysService
              ) { 
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
this.doc.DocNum=this.pageType; 
console.log(this.pageType)
    this.prtservice.getFactura('/factura/Encabezado',this.doc).then(
      res=>{
        this.Encabezado=res[0];
        console.log('detalle',this.Encabezado)
      }
    );
    this.prtservice.getDetalle('/factura/Detalle',this.doc.DocNum).subscribe(
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
