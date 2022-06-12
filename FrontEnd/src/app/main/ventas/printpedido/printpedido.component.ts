import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {PrintPedidoService} from '../print-pedido.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-printpedido',
  templateUrl: './printpedido.component.html',
  styleUrls: ['./printpedido.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrintPedidoComponent implements OnInit {
  Encabezado:any={
    TotalDoc:0
  };
  Detalle:any;
  doc:any={
DocNum:1
  }
  pageType:any;
  constructor(private prtservice: PrintPedidoService,
              private activatedRoute: ActivatedRoute,
              ) { 
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
this.doc.DocNum=this.pageType;
console.log(this.pageType)
    this.prtservice.getPedido('/pedido/Encabezado',this.doc).then(
      res=>{
        this.Encabezado=res[0];
        console.log('detalle',this.Encabezado)
      }
    );
    this.prtservice.getDetalle('/pedido/Detalle',this.doc.DocNum).subscribe(
      (res)=>{
        this.Detalle=res;
    
      },
      (err)=>{console.log(err);}
    );
    

 

  }

  ngOnInit(): void {



  }

}
