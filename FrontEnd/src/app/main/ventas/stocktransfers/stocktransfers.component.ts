import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {compraEncabezado, compraDetalle} from '../interfaces/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { StockTransfersService } from '../stocktransfers/stocktransfers.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { FuseUtils } from '@fuse/utils';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

//import { BuscarOrdenComponent } from '../buscar-orden/buscar-orden.component';


@Component({
  selector: 'app-stocktransfers',
  templateUrl: './stocktransfers.component.html',
  styleUrls: ['./stocktransfers.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class StockTransfersComponent implements OnInit {
displayedColumns = [ 'DocNum', 'SocioCode', 'NombreSocio', 'TotalDoc', 'fechaDoc'];
cztEncabezado: compraEncabezado = {
      DocNum: null,
      fechaDoc: null,	
      SocioCode: null,
      NombreSocio: null,
      Direccion: null,
      impuesto: null,
      tasa: null,
      TotalDoc: null,
      DescPorcentaje: null,
      Moneda: null,
      comentarios: null,
      vendedor: null,
      LastUpdate: null,	 
      UserCreate: null,
  
    };
cztDetalle: compraDetalle = {
      DocNum: null,
      Linea: null,
      itemCode: null,
      itemName: null,
      cantidad: null,
      precio: null,  
      DescuentoLine: null,
      impuestocod: null,
      totaLine: null,
      almacen: null,
    };




dataSource: FilesDataSource | null;
@ViewChild(MatPaginator, {static: true})
paginator: MatPaginator;
  
@ViewChild(MatSort, {static: true})
sort: MatSort;
  
@ViewChild('filter', {static: true})
filter: ElementRef;
  
    // Private
    private _unsubscribeAll: Subject<any>;

    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

constructor(private comprasServcies: StockTransfersService,
            public _matDialog: MatDialog,
            private router: Router     ) {

    this._unsubscribeAll = new Subject();

}

getFormattedDate( originalDate ){
    originalDate = new Date(originalDate);
    return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}



ngOnInit(): void { 
    this.dataSource = new FilesDataSource(this.comprasServcies, this.paginator, this.sort);
   
    fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(150),
            distinctUntilChanged()
        )
        .subscribe(() => {
            if ( !this.dataSource )
            {
                return;
            }

            this.dataSource.filter = this.filter.nativeElement.value;
        });
  };

}

  // tslint:disable-next-line: align
  export class FilesDataSource extends DataSource<any>
  {
      private _filterChange = new BehaviorSubject('');
      private _filteredDataChange = new BehaviorSubject('');
  
      /**
       * Constructor
       *
       * @param {paisesServices} paisesServices
       * @param {MatPaginator} _matPaginator
       * @param {MatSort} _matSort
       */
      constructor(
          private comprasServcies: StockTransfersService,
          private _matPaginator: MatPaginator,
          private _matSort: MatSort
      )
      {
          super();
  
          this.filteredData = this.comprasServcies.compras;
      }
  
      /**
       * Connect function called by the table to retrieve one stream containing the data to render.
       *
       * @returns {Observable<any[]>}
       */
      connect(): Observable<any[]>
      {
          const displayDataChanges = [
              this.comprasServcies.onProductsChanged,
             this._matPaginator.page,
              this._filterChange,
             this._matSort.sortChange
          ];
  
          return merge(...displayDataChanges)
              .pipe(
                  map(() => {
                          let data = this.comprasServcies.compras.slice();
  
                          data = this.filterData(data);
  
                          this.filteredData = [...data];
  
                          data = this.sortData(data);
  
                          // Grab the page's slice of data.
                          const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                          return data.splice(startIndex, this._matPaginator.pageSize);
                      }
                  ));
      }
  
      // -----------------------------------------------------------------------------------------------------
      // @ Accessors
      // -----------------------------------------------------------------------------------------------------
  
      // Filtered data
      get filteredData(): any
      {
          return this._filteredDataChange.value;
      }
  
      set filteredData(value: any)
      {
          this._filteredDataChange.next(value);
      }
  
      // Filter
      get filter(): string
      {
          return this._filterChange.value;
      }
  
      set filter(filter: string)
      {
          this._filterChange.next(filter);
      }
  
      // -----------------------------------------------------------------------------------------------------
      // @ Public methods
      // -----------------------------------------------------------------------------------------------------
  
      /**
       * Filter data
       *
       * @param data
       * @returns {any}
       */
      filterData(data): any
      {
          if ( !this.filter )
          {
              return data;
          }
          return FuseUtils.filterArrayByString(data, this.filter);
      }
  
      /**
       * Sort data 
       *
       * @param data
       * @returns {any[]}
       */
      sortData(data): any[]
      {
          if ( !this._matSort.active || this._matSort.direction === '' )
          {
              return data;
          }
  
          return data.sort((a, b) => {
              let propertyA: number | string = '';
              let propertyB: number | string = '';
  
              switch ( this._matSort.active )
              {
                  case 'DocNum':
                      [propertyA, propertyB] = [a.DocNum, b.DocNum];
                      break;
                  case 'NombreSocio':
                      [propertyA, propertyB] = [a.NombreSocio, b.NombreSocio];
                      break;
                  case 'fechadoc':
                      [propertyA, propertyB] = [a.fechadoc, b.fechadoc];
                      break;
              }
  
              const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
              const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
              return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
          });
      }
  
      /**
       * Disconnect 
       */
      disconnect(): void
      {
      }





}
