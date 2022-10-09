import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {PrintEntradaService} from '../printentrada.service'
import { ActivatedRoute, Router } from '@angular/router';
import { CompanysService } from 'app/main/Configuracion/companys/companys.service';
@Component({
  selector: 'app-printentrada',
  templateUrl: './printentrada.component.html',
  styleUrls: ['./printentrada.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrintEntradaComponent implements OnInit {
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
  constructor(private prtservice: PrintEntradaService,
              private activatedRoute: ActivatedRoute,
              private companyServices:CompanysService
              ) { 
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
this.doc.DocNum=this.pageType;
console.log(this.pageType)
    this.prtservice.getCotizacion('/entrada/Encabezado',this.doc).then(
      res=>{
        this.Encabezado=res[0];
        console.log('detalle',this.Encabezado)
      }
    );
    this.prtservice.getDetalle('/entrada/Detalle',this.doc.DocNum).subscribe(
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
