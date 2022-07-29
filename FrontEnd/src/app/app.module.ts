import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import {ventasModule} from 'app/main/ventas/ventas.module';
import {SociosNegociosModule} from 'app/main/socios-negocios/socios-negocios.module';
import {ConfiguracionModule} from 'app/main/Configuracion/configuracion.module';
import {GuardGuard } from './main/autenticar/guard.guard'
import {GuardallGuard} from './main/autenticar/guardall.guard';
import { SaldoClienteComponent } from './main/Reportes/Finanzas/saldo-cliente/saldo-cliente.component'
import {ReportesModule} from './main/Reportes/reportes.module'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from 'app/fake-db/fake-db.service';
import { CitasComponent } from './main/Configuracion/citas/citas.component';
import { ValidacionesComponent } from './main/Configuracion/validaciones/validaciones.component';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
    {
        path        : 'autenticar',
        loadChildren: () => import('./main/autenticar/autenticar.module').then(m => m.AutenticarModule
           ), canActivate: [GuardGuard]
    },
    {
        path        : 'configuracion',
        loadChildren: () => import('./main/Configuracion/configuracion.module').then(m => m.ConfiguracionModule)
        // , canActivate: [GuardallGuard]
    },
    {
        path        : 'ventas',
        loadChildren: () => import('./main/ventas/ventas.module').then(m => m.ventasModule)
      //  , canActivate: [GuardallGuard]
    },
    
    {
        path        : 'socios-negocios',
        loadChildren: () => import('./main/socios-negocios/socios-negocios.module').then(m => m.SociosNegociosModule)
      //  , canActivate: [GuardallGuard]
    },
    {
        path:'reportes',
        loadChildren: () => import('./main/Reportes/reportes.module').then(m => m.ReportesModule)
      //  , canActivate: [GuardallGuard]

    },
    {
        path      : '**',
        redirectTo: 'autenticar/auth/login'
    }

];

@NgModule({
    declarations: [
        AppComponent,
        
        
     
    ],
    imports     : [
        BrowserModule,

        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        FuseSharedModule,
        // App modules
        LayoutModule,
        SampleModule,
        ventasModule,
        ConfiguracionModule,
        SociosNegociosModule,
        ReportesModule

      
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
