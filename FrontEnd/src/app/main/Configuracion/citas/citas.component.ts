import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { CitasService } from './citas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
  

})
export class CitasComponent implements OnInit {
  
    
    dataSource: FilesDataSource | null;
      // displayedColumns = ['cemp','ccomp', 'csuc','cpais','cdepa','cmuni','careat','nombres','apellidos','identidad','genero','rtn','edad','tipo_sangre','direccion','telefono','celular','correo','observaciones','fecha_ingreso', 'estado'];
     // displayedColumns = ['ccita','nombre','pesoini','pesoact','talla','tallacms','imc','ptr','fechavisita','estado'];
     displayedColumns = ['ccita', 'cexp', 'name', 'fechavisita', 'estado'];
    param:any;
    
      @ViewChild(MatPaginator, {static: true})
      paginator: MatPaginator;
    
      @ViewChild(MatSort, {static: true})
      sort: MatSort;
    
      @ViewChild('filter', {static: true})
      filter: ElementRef;

      Exp:any;
     
      // Private
      private _unsubscribeAll: Subject<any>;
      constructor(private citasServices: CitasService , private activatedRoute: ActivatedRoute,) { 
        this._unsubscribeAll = new Subject();
     
      }
    
      ngOnInit(): void {
        this.param=this.activatedRoute.snapshot.params['exp'];

      
        this.dataSource = new FilesDataSource(this.citasServices, this.paginator, this.sort,this.activatedRoute);
       
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
         * @param {citasServices} citasServices
         * @param {MatPaginator} _matPaginator
         * @param {MatSort} _matSort
     
         */
        constructor(
            private citasServices: CitasService,
            private _matPaginator: MatPaginator,
            private _matSort: MatSort,
            private activatedRoute: ActivatedRoute,
        )
        {
            super();
     
            const params=this.activatedRoute.snapshot.params;
          
    this.citasServices.getProducts('/cita/',params['exp']).then(products =>  {
        this.filteredData = this.citasServices.products ;
   
    }

    );
          
        }
    
        /**
         * Connect function called by the table to retrieve one stream containing the data to render.
         *
         * @returns {Observable<any[]>}
         */
        connect(): Observable<any[]>
        {
            const displayDataChanges = [
                this.citasServices.onProductsChanged,
               this._matPaginator.page,
                this._filterChange,
               this._matSort.sortChange
            ];
    
            return merge(...displayDataChanges)
                .pipe(
                    map(() => {
                            let data = this.citasServices.products.slice();
    
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
    
                switch (this._matSort.active) {
                    case 'ccita':
                        [propertyA, propertyB] = [a.ccita, b.ccita];
                        break;
                    case 'cexp':
                        [propertyA, propertyB] = [a.cexp, b.cexp];
                        break;
                    case 'name':
                        [propertyA, propertyB] = [a.name, b.name];
                        break;
                    case 'fechavisita':
                        [propertyA, propertyB] = [a.fechavisita, b.fechavisita];
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
    
    
    
    
    
