import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ProjectDashboardServiceService } from './project-dashboard-service.service'
import * as shape from 'd3-shape';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { CompanysService } from '../Configuracion/companys/companys.service';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations

    
})
export class SampleComponent implements OnInit
{
   projects: any[];
Nfact:any;
NBanner: any;
user:any;
Top10:any[];
    selectedProject: any;

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};
    company:any={
        compania:null
    }
    dateNow = Date.now();
    alertas:any;
    Calertas:any;
    getFormattedDate( originalDate ){
        originalDate=new Date(originalDate);
     return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
 }
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService:ProjectDashboardServiceService,
        private _companyServices: CompanysService
    )
    { 
        this._companyServices.getCompanyOne("/company/edit/",1).subscribe(
            (res)=>{
 
            this.company=res[0];
     
            })

        this._projectDashboardService.getWidFactura('/factura/Columnasalertas').subscribe(
            (res: any[])=>{
this.Calertas=res;


for (let l =0; l<this.Calertas.length;l++){
    this.widgets.widget10.table.columns.push({title:this.Calertas[l]['COLUMN_NAME']});
}

        this._projectDashboardService.getWidFactura('/factura/alertas').subscribe(
            (res1: any[])=>{
this.alertas=res1;



let   contador:number=0;

for (let p =0; p<this.alertas.length;p++){

 this.widgets.widget10.table.rows[p].push({value:this.alertas[p]['Expediente']});
 this.widgets.widget10.table.rows[p].push({value:this.alertas[p]['Socio']});
this.widgets.widget10.table.rows[p].push({value:this.alertas[p]['telefono']});
 this.widgets.widget10.table.rows[p].push({value:this.alertas[p]['cita']});
 this.widgets.widget10.table.rows[p].push({value:this.alertas[p]['Codigo']});
 this.widgets.widget10.table.rows[p].push({value:this.alertas[p]['Descripcion']});
 this.widgets.widget10.table.rows[p].push({value:this.alertas[p]['Cantidad']});
 this.widgets.widget10.table.rows[p].push({value:this.getFormattedDate(this.alertas[p]['Proxima Compra'])});
    // this.widgets.widget10.table.rows[0].push({value:this.alertas[p]['Socio']});
 
    contador++;
}




})


            })
        
        let user=JSON.parse(localStorage.getItem('usuario'));
        this.user=user.nombre+' '+user.apellido;
        this._projectDashboardService.getWidFactura('/factura/widgetFactura').subscribe(
            res=>{
                this.Nfact=res;
                this.widgets.widget1.data.count.H=this.Nfact[0]['total'];
                this.widgets.widget1.data.count.A=this.Nfact[1]['total'];
                this.widgets.widget1.data.count.W=this.Nfact[2]['total'];
             
          
            });

            this._projectDashboardService.getWidFactura('/factura/widbanner').subscribe(
                res=>{
                    this.NBanner=res;
                    this.widgets.widget2.data.count=this.NBanner[0]['total'];
                    this.widgets.widget3.data.count=this.NBanner[1]['total'];
                    this.widgets.widget4.data.count=this.NBanner[2]['total'];
                   
     
            
              
                });
                this._projectDashboardService.getWidFactura('/factura/widTop10').subscribe(
                    (res: any[])=>{
              
                
                        this.Top10=res;
                    
                        if (this.Top10.length-1>=0){    
                        this.widgets.widget5.mainChart['TW'][0].name=this.Top10[0]['itemCode'];
                        this.widgets.widget5.mainChart['TW'][0].series[0]['value']=this.Top10[0]['Total'];                     
                        this.widgets.widget5.supporting['created'].count['TW']=this.Top10[0]['cantidad'];
                        this.widgets.widget5.supporting['created'].label=this.Top10[0]['itemName'];
                        }

                        if (this.Top10.length-1>=1){
                        this.widgets.widget5.mainChart['TW'][1].name=this.Top10[1]['itemCode'];
                        this.widgets.widget5.mainChart['TW'][1].series[0]['value']=this.Top10[1]['Total'];
                        this.widgets.widget5.supporting['closed'].count['TW']=this.Top10[1]['cantidad'];
                        this.widgets.widget5.supporting['closed'].label=this.Top10[1]['itemName'];
                        }
                        if (this.Top10.length-1>=2){
                        this.widgets.widget5.mainChart['TW'][2].name=this.Top10[2]['itemCode'];
                        this.widgets.widget5.mainChart['TW'][2].series[0]['value']=this.Top10[2]['Total'];
                        this.widgets.widget5.supporting['reOpened'].count['TW']=this.Top10[2]['cantidad'];
                        this.widgets.widget5.supporting['reOpened'].label=this.Top10[2]['itemName'];
                        }
                        if (this.Top10.length-1>=3){
                        this.widgets.widget5.mainChart['TW'][3].name=this.Top10[3]['itemCode'];
                        this.widgets.widget5.mainChart['TW'][3].series[0]['value']=this.Top10[3]['Total'];
                        
                        this.widgets.widget5.supporting['wontFix'].count['TW']=this.Top10[3]['cantidad'];
                        this.widgets.widget5.supporting['wontFix'].label=this.Top10[3]['itemName'];
                        }
                        if (this.Top10.length-1>=4){
                        this.widgets.widget5.mainChart['TW'][4].name=this.Top10[4]['itemCode'];
                        this.widgets.widget5.mainChart['TW'][4].series[0]['value']=this.Top10[4]['Total'];
                        
                        this.widgets.widget5.supporting['needsTest'].count['TW']=this.Top10[4]['cantidad'];
                        this.widgets.widget5.supporting['needsTest'].label=this.Top10[4]['itemName'];
                        }
                     /*-------------------------------------------------*/


          
                 





                
                  
                    })
        
        this.widget5 = {
        currentRange  : 'TW',
        xAxis         : true,
        yAxis         : true,
        gradient      : false,
        legend        : false,
        showXAxisLabel: false,
        xAxisLabel    : 'Days',
        showYAxisLabel: false,
        yAxisLabel    : 'Isues',
        scheme        : {
            domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
        },
        onSelect      : (ev) => {
            console.log(ev);
        },
        supporting    : {
            currentRange  : '',
            xAxis         : false,
            yAxis         : false,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve         : shape.curveBasis
        }
    };

    /**
     * Widget 6
     */
    this.widget6 = {
        currentRange : 'TW',
        legend       : false,
        explodeSlices: false,
        labels       : true,
        doughnut     : true,
        gradient     : false,
        scheme       : {
            domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
        },
        onSelect     : (ev) => {
            console.log(ev);
        }
    };

    /**
     * Widget 7
     */
    this.widget7 = {
        currentRange: 'T'
    };

    /**
     * Widget 8
     */
    this.widget8 = {
        legend       : false,
        explodeSlices: false,
        labels       : true,
        doughnut     : false,
        gradient     : false,
        scheme       : {
            domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
        },
        onSelect     : (ev) => {
            console.log(ev);
        }
    };

    /**
     * Widget 9
     */
    this.widget9 = {
        currentRange  : 'TW',
        xAxis         : false,
        yAxis         : false,
        gradient      : false,
        legend        : false,
        showXAxisLabel: false,
        xAxisLabel    : 'Days',
        showYAxisLabel: false,
        yAxisLabel    : 'Isues',
        scheme        : {
            domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
        },
        curve         : shape.curveBasis
    };

    setInterval(() => {
        this.dateNow = Date.now();
    }, 1000);

    }
    ngOnInit(): void
    {


    this.projects = this._projectDashboardService.projects;
    this.selectedProject = this.projects[0];
    this.widgets = this._projectDashboardService.widgets;
   
    /**
     * Widget 11
     */
    this.widget11.onContactsChanged = new BehaviorSubject({});
    this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
    this.widget11.dataSource = new FilesDataSource(this.widget11);


      
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11)
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}

