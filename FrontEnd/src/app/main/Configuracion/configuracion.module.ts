import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { ProductModule} from './product/product.module';
import { TipoUsuariosModule } from './tipousuarios/tipousuarios.module';
import { TipoUsuariosService } from './tipousuarios/tipousuarios.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuarioModule } from './usuario/usuario.module';

import { SucursalesModule } from './sucursales/sucursales.module';
import { SucursalModule } from './sucursal/sucursal.module';
import {SucursalesService} from './sucursales/sucursales.service';
import { NgModule } from '@angular/core';

import { paisesModule } from './paises/paises.module';
import { PaisModule } from './pais/pais.module';
import {PaisesService} from './paises/paises.service';

import { DepartmentsModule } from './departments/departments.module';
import { DepartmentModule } from './department/department.module'; 
import {DepartmentsService} from './departments/departments.service';

import { MunicipiosModule } from './municipios/municipios.module';
import { MunicipioModule } from './municipio/municipio.module'; 
import {MunicipiosService} from './municipios/municipios.service';

import { AreatrabajosModule } from './areatrabajos/areatrabajos.module';
import { AreatrabajoModule } from './areatrabajo/areatrabajo.module'; 
import {AreatrabajosService} from './areatrabajos/areatrabajos.service';

import { BodegasModule } from './bodegas/bodegas.module';
import { BodegaModule } from './bodega/bodega.module'; 
import { BodegasService} from './bodegas/bodegas.service';

import { LotebodegasModule } from './lotebodegas/lotebodegas.module';
import { LotebodegaModule } from './lotebodega/lotebodega.module'; 
import { LotebodegasService} from './lotebodegas/lotebodegas.service';

import { MonedasModule } from './monedas/monedas.module';
import { MonedaModule } from './moneda/moneda.module'; 
import { MonedasService} from './monedas/monedas.service';

import { GastosModule } from './gastos/gastos.module';
import { GastoModule } from './gasto/gasto.module'; 
import { GastosService} from './gastos/gastos.service';

import { EmpleadosModule } from './empleados/empleados.module';
import { EmpleadoModule } from './empleado/empleado.module'; 
import { EmpleadosService} from './empleados/empleados.service';



import {NumeracionModule} from './numeracion/numeracion.module';
import {NumeracionesModule} from './numeraciones/numeraciones.module';

import {CompanyModule} from './company/company.module';
import {CompanysModule} from './companys/companys.module';
import { NumeracionesService } from './numeraciones/numeraciones.service';
import { CompanysService } from './companys/companys.service';

import {GruposModule} from './grupos/grupos.module';
import {GrupoModule} from './grupo/grupo.module';
import { GruposService } from './grupos/grupos.service';

import {ListapreciosModule} from './listaprecios/listaprecios.module';
import {ListaprecioModule} from './listaprecio/listaprecio.module';
import { ListapreciosService } from './listaprecios/listaprecios.service';

import {PreciosModule} from './precios/precios.module';
import {PrecioModule} from './precio/precio.module';
import { PreciosService } from './precios/precios.service';

import { ExpedientesModule} from './expedientes/expedientes.module';
import { ExpedienteModule} from './expediente/expediente.module';
import { ExpedientesService } from './expedientes/expedientes.service';

import { CitasModule} from './citas/citas.module';
import { CitaModule} from './cita/cita.module';
import { CitasService } from './citas/citas.service';


import { HistorialsModule} from './historials/historials.module';
import { HistorialModule} from './historial/historial.module';
import { HistorialsService } from './historials/historials.service';


import { TipoUsuariosComponent } from './tipousuarios/tipousuarios.component';
import { TipoUsuarioComponent } from './tipousuario/tipousuario.component';
import { TipoUsuarioModule } from './tipousuario/tipousuario.module';

import { FormaPagosModule } from './formapagos/formapagos.module';
import { FormaPagoModule } from './formapago/formapago.module';
import { FormaPagosService } from './formapagos/formapagos.service';

import { OrdencomprasComponent } from './ordencompras/ordencompras.component';
import { OrdencompraComponent } from './ordencompra/ordencompra.component';
import { CxpagarsComponent } from './cxpagars/cxpagars.component';
import { CxpagarComponent } from './cxpagar/cxpagar.component';
import { PreciosComponent } from './precios/precios.component';
import { PrecioComponent } from './precio/precio.component';
import { HistorialsComponent } from './historials/historials.component';
import { HistorialComponent } from './historial/historial.component';
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { CitasComponent } from './citas/citas.component';
import { CitaComponent } from './cita/cita.component';
//import { ListapreciosComponent } from './listaprecios/listaprecios.component';

 


@NgModule({
  declarations: [
  

OrdencomprasComponent,
      
OrdencompraComponent,
      
CxpagarsComponent,
      
CxpagarComponent,


      
]
,
  imports: [

    GruposModule,
    GrupoModule,    
    NumeracionesModule,
    NumeracionModule,
    DepartmentsModule,
    DepartmentModule,
    MunicipiosModule,
    MunicipioModule,
    CompanysModule,
    CompanyModule,
    AreatrabajosModule,
    AreatrabajoModule,
    BodegasModule,
    BodegaModule,
    LotebodegasModule,
    LotebodegaModule,
    paisesModule,
    PaisModule,
    MonedasModule,
    MonedaModule,
    GastosModule,
    GastoModule,
    EmpleadosModule,
    EmpleadoModule,
    SucursalesModule,
    UsuariosModule,
    UsuarioModule,
    TipoUsuariosModule,
    TipoUsuarioModule,
    FormaPagosModule,
    FormaPagoModule,
    ListapreciosModule,
    ListaprecioModule,
    PreciosModule,
    PrecioModule,
    HistorialsModule,
    HistorialModule,
    ExpedientesModule,
    ExpedienteModule,
    CitasModule,
    CitaModule,
    ProductsModule,
    ProductModule   
     
  ],
  providers   : [
    PaisesService,
    NumeracionesService,
    DepartmentsService,
    CompanysService,
    SucursalesService,
    GruposService,
   UsuariosService,
   TipoUsuariosService,
   FormaPagosService,
   ListapreciosService,
   PreciosService,
   HistorialsService ,
   ExpedientesService,
   CitasService,
   ProductsService,
   GastosService,
   MunicipiosService,
   BodegasService,
   MonedasService,
   EmpleadosService


]
})
export class ConfiguracionModule { }
