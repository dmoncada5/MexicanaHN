import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {PrintFacturaService} from '../print-factura.service'
import { ActivatedRoute, Router } from '@angular/router';
import { CompanysService } from 'app/main/Configuracion/companys/companys.service';
import { facturaEncabezado } from '../interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-printfactura',
  templateUrl: './printfactura.component.html',
  styleUrls: ['./printfactura.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrintfacturaComponent implements OnInit {
  Encabezado:any={
    TotalDoc:0
  };
  Detalle:any;
  numero1 : any;
  ELEMENT_DATA: Element[] = []; 
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  doc:any={
DocNum:1
  }
  selectSerie: any;
  pageType:any;
  company:any={
empresa:null
  }
  FacturaE: facturaEncabezado = {};
  series: Object;
  numero2: any;
  constructor(private prtservice: PrintFacturaService,
              private activatedRoute: ActivatedRoute,
              private companyServices: CompanysService
              ) { 
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
this.doc.DocNum=this.pageType; 

    this.prtservice.getFactura('/factura/Encabezado',this.doc).then(
      res=>{
        this.Encabezado=res[0];
        this.numero1=res[0]['fact_emini']

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
