
import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged,map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { SucursalesService } from './sucursales.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
//import { Component, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
//import { fuseAnimations } from '@fuse/animations';
//import { FuseUtils } from '@fuse/utils';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class SucursalesComponent implements OnInit {

    dataSource: FilesDataSource | null;
    displayedColumns = ['csuc', 'sucursal', 'estado'];
    
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;
  
    @ViewChild(MatSort, {static: true})
    sort: MatSort;
  
    @ViewChild('filter', {static: true})
    filter: ElementRef;


  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(private sucursalesServices: SucursalesService) {
    this._unsubscribeAll = new Subject();
 

   }


 // constructor() { }

  ngOnInit(): void {
    this.dataSource = new FilesDataSource(this.sucursalesServices, this.paginator, this.sort);
   
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
}

  }



export class FilesDataSource extends DataSource<any>
  {
      private _filterChange = new BehaviorSubject('');
      private _filteredDataChange = new BehaviorSubject('');
  
      /**
       * Constructor
       *
       * @param {sucursalesServices} sucursalesServices
       * @param {MatPaginator} _matPaginator
       * @param {MatSort} _matSort
       */
      constructor(
          private sucursalesServices: SucursalesService,
          private _matPaginator: MatPaginator,
          private _matSort: MatSort
      )
      {
          super();
  
          this.filteredData = this.sucursalesServices.products;
      }
  
      /**
       * Connect function called by the table to retrieve one stream containing the data to render.
       *
       * @returns {Observable<any[]>}
       */
      connect(): Observable<any[]>
      {
          const displayDataChanges = [
              this.sucursalesServices.onProductsChanged,
             this._matPaginator.page,
              this._filterChange,
             this._matSort.sortChange
          ];
  
          return merge(...displayDataChanges)
              .pipe(
                  map(() => {
                          let data = this.sucursalesServices.products.slice();
  
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
                  case 'csuc':
                      [propertyA, propertyB] = [a.csuc, b.csuc];
                      break;
                  case 'sucursal':
                      [propertyA, propertyB] = [a.sucursal, b.sucursal];
                      break;
                  case 'estado':
                      [propertyA, propertyB] = [a.estado, b.estado];
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
  