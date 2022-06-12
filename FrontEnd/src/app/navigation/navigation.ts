import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'Dashboard',
        title: 'Dashboard',
        translate: 'NAV.DASHBOARD',
        type: 'group',
        icon: 'dashboard',
        children: [{
                id: 'principal',
                title: 'Principal',
                icon: 'dashboard',
                type: 'item',
                url: '/configuracion/inicio',
                exactMatch: true,
                
        }]
    },
    {
        id: 'configuracion',
        title: 'configuracion',
        translate: 'NAV.CONFIGURACION',
        type: 'group',
        icon: 'settings',
        children: [
            {
                id: 'gestion',
                title: 'Gestion',
                translate: 'NAV.CONFIGURACION',
                type: 'collapsable',
                icon: 'settings',
                children: [
                    {
                        id: 'region',
                        title: 'Configuracion Region',
                        translate: 'NAV.CONFIGURACION',
                        type: 'collapsable',
                        icon: 'settings',
                        children: [
                            {
                                id: 'paises',
                                title: 'Paises',
                                type: 'item',
                                url: '/configuracion/paises',
                                exactMatch: true,
                            },
                            {
                                id: 'departments',
                                title: 'Departments',
                                type: 'item',
                                url: '/configuracion/departments',
                                exactMatch: true,
                            },

                            {
                                id: 'municipios',
                                title: 'Municipios',
                                type: 'item',
                                url: '/configuracion/municipios',
                                exactMatch: true,
                            },

                            {
                                id: 'monedas',
                                title: 'Monedas',
                                type: 'item',
                                url: '/configuracion/monedas',
                                exactMatch: true,
                            },
                        ],
                    },
                    //      {
                    //       id       : 'Inventario',
                    // title    : 'Inventario',
                    // translate: 'NAV.CONFIGURACION',
                    // type     : 'collapsable',
                    // icon: 'settings',
                    // children : [

                    //     {

                    //         id        : 'productos',
                    //         title     : 'Productos',
                    //         type      : 'item',
                    //         url       : '/configuracion/products',
                    //         exactMatch: true
                    //     },{

                    //         id        : 'bodegas',
                    //         title     : 'Bodegas',
                    //         type      : 'item',
                    //         url       : '/configuracion/bodegas',
                    //         exactMatch: true
                    //     }
                    //     // ,
                    //     // {

                    //     //     id        : 'lotebodegas',
                    //     //     title     : 'Lote Bodega',
                    //     //     type      : 'item',
                    //     //     url       : '/configuracion/lotebodegas',
                    //     //     exactMatch: true
                    //     // }

                    //     ]

                    // },
                    {
                        id: 'Finanzas',
                        title: 'Finanzas',
                        translate: 'NAV.CONFIGURACION',
                        type: 'collapsable',
                        icon: 'settings',
                        children: [
                            {
                                id: 'formapagos',
                                title: 'Formas de Pagos',
                                type: 'item',
                                url: '/configuracion/formapagos',
                                exactMatch: true,
                            },
                            {
                                id: 'promos',
                                title: 'Promociones',
                                type: 'item',
                                url: '/ventas/promos',
                                exactMatch: true,
                            },
                            {
                                id: 'listaprecios',
                                title: 'Lista Precios',
                                type: 'item',
                                url: '/configuracion/listaprecios',
                                exactMatch: true,
                            },
                            {
                                id: 'grupos',
                                title: 'Grupos',
                                type: 'item',
                                url: '/configuracion/grupos',
                                exactMatch: true,
                            },
                            {
                                id: 'numeraciones',
                                title: 'Numeraciones',
                                type: 'item',
                                url: '/configuracion/numeraciones',
                                exactMatch: true,
                            },
                            {
                                id: 'gastos',
                                title: 'Gastos',
                                type: 'item',
                                url: '/configuracion/gastos',
                                exactMatch: true,
                            },
                        ],
                    },
                    {
                        id: 'Configuraciones Generales ',
                        title: 'Configuraciones Generales',
                        translate: 'NAV.CONFIGURACION',
                        type: 'collapsable',
                        icon: 'settings',
                        children: [
                            {
                                id: 'areatrabajos',
                                title: 'Areas Trabajos',
                                type: 'item',
                                url: '/configuracion/areatrabajos',
                                exactMatch: true,
                            },
                            {
                                id: 'empleados',
                                title: 'Empleados',
                                type: 'item',
                                url: '/configuracion/empleados',
                                exactMatch: true,
                            },
                            {
                                id: 'companys',
                                title: 'Compañias',
                                type: 'item',
                                url: '/configuracion/companys',
                                exactMatch: true,
                            },
                            {
                                id: 'sucursales',
                                title: 'Sucursales',
                                type: 'item',
                                url: '/configuracion/sucursales',
                                exactMatch: true,
                            },
                            {
                                id: 'usuarios',
                                title: 'Usuarios',
                                type: 'item',
                                url: '/configuracion/usuarios',
                                exactMatch: true,
                            },
                            {
                                id: 'tipousuarios',
                                title: 'Tipos de Usuarios',
                                type: 'item',
                                url: '/configuracion/tipousuarios',
                                exactMatch: true,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'ventas',
        title: 'Ventas',
        translate: 'NAV.VENTAS',
        type: 'group',
        icon: 'shopping_cart',
        children: [
            {
                id: 'ventas',
                title: 'Ventas',
                translate: 'NAV.VENTAS',
                type: 'collapsable',
                icon: 'shopping_cart',
                children: [
                    {
                        id: 'Cotizacion',
                        title: 'Cotizacion',
                        type: 'item',
                        url: '/ventas/cotizaciones',
                        exactMatch: true,
                    },
                    
                    {
                        id: 'pedido',
                        title: 'Pedido',
                        type: 'item',
                        url: '/ventas/pedidos',
                        exactMatch: true,
                    },
                    {
                        id: 'factura',
                        title: 'Factura',
                        type: 'item',
                        url: '/ventas/facturas',
                        exactMatch: true,
                    },
                    {
                        id: 'entrega',
                        title: 'Entrega',
                        type: 'item',
                        url: '/ventas/entregas',
                        exactMatch: true,
                    },
        
                    {
                        id: 'notacredito',
                        title: 'Nota de Credito',
                        type: 'item',
                        url: 'ventas/notacreditos',
                        exactMatch: true,
                    },
                   
                    // {
                    //     id: 'consultaexistencia',
                    //     title: 'Consulta de Existencias',
                    //     type: 'item',
                    //     url: 'ventas/consultaexistencia',
                    //     exactMatch: true,
                    // },

                ],
            },
        ],
    },
    // {
    //     id: 'inventario',
    //     title: 'Inventario',
    //     translate: 'NAV.INVENTARIO',
    //     type: 'group',
    //     icon: 'person_outline',
    //     children: [
    //         {
    //             id: 'inventario',
    //             title: 'Productos',
    //             translate: 'NAV.INVENTARIO',
    //             type: 'collapsable',
    //             icon: 'person_outline',
    //             children: [
    //                 {
    //                     id: 'productos',
    //                     title: 'Productos',
    //                     type: 'item',
    //                     url: '/configuracion/products',
    //                     exactMatch: true,
    //                 },
    //                 {
    //                     id: 'bodegas',
    //                     title: 'Bodegas',
    //                     type: 'item',
    //                     url: '/configuracion/bodegas',
    //                     exactMatch: true,
    //                 },
    //             ],
    //         },
    //     ],
    // },
    
    {
        id: 'Inventario',
        title: 'Inventario',
        translate: 'NAV.INVENTARIO',
        type: 'group',
        icon: 'person_outline',
        children: [
            {
                id: 'Inventario',
                title: 'Productos',
                translate: 'NAV.INVENTARIO',
                type: 'collapsable',
                icon: 'person_outline',
                children: [
                    {
                        id: 'productos',
                        title: 'Productos',
                        type: 'item',
                        url: '/configuracion/products',
                        exactMatch: true,
                    },
                    {
                        id: 'bodegas',
                        title: 'Bodegas',
                        type: 'item',
                        url: '/configuracion/bodegas',
                        exactMatch: true,
                    },
                    // {
                    //     id: 'stocktransfer',
                    //     title: 'Transferencia de Stock',
                    //     type: 'item',
                    //     url: 'ventas/stocktransfers',
                    //     exactMatch: true,
                    // },
                    {
                        id: 'ordencompra',
                        title: 'Orden de Compras',
                        type: 'item',
                        url: 'ventas/pcompras',
                        exactMatch: true,
                    },
                    {
                        id: 'compra',
                        title: 'Factura de Compra',
                        type: 'item',
                        url: 'ventas/compras',
                        exactMatch: true,
                    },
                    {
                        id: 'notacreditocompra',
                        title: 'Nota de Credito Compras',
                        type: 'item',
                        url: 'ventas/notacreditosp',
                        exactMatch: true,
                    },
                    {
                        id: 'entrada',
                        title: 'Entrada de Mercaderia',
                        type: 'item',
                        url: 'ventas/entradas',
                        exactMatch: true,
                    },
                    {
                        id: 'salida',
                        title: 'Salida de Mercaderia',
                        type: 'item',
                        url: 'ventas/salidas',
                        exactMatch: true,
                    },
                    {
                        id: 'consultaexistencia',
                        title: 'Consulta de Existencias',
                        type: 'item',
                        url: 'ventas/consultaexistencia',
                        exactMatch: true,
                    },
                ],
            },
        ],
    },


    {
        id: 'sociosdenegocios',
        title: 'Socios de negocios',
        translate: 'NAV.SOCIOSDENEGOCIOS',
        type: 'group',
        icon: 'person_outline',
        children: [
            {
                id: 'sociosdenegocios',
                title: 'Clientes',
                translate: 'NAV.SOCIOSDENEGOCIOS',
                type: 'collapsable',
                icon: 'person_outline',
                children: [
                    {
                        id: 'socios',
                        title: 'Socios',
                        type: 'item',
                        url: '/socios-negocios/socios',
                        exactMatch: true,
                    },
                ],
            },
        ],
    },
    {
        id: 'REPORTES',
        title: 'REPORTES',
        translate: 'NAV.REPORTES',
        type: 'group',
        icon: 'settings',
        children: [
            {
                id: 'REPORTES',
                title: 'Finanzas',
                translate: 'NAV.REPORTES',
                type: 'collapsable',
                icon: 'attach_money',
                children: [
                    {
                        id: 'saldocliente',
                        title: 'Saldo Cliente',
                        type: 'item',
                        url: 'reporte/saldocliente',
                        exactMatch: true,
                    
                    },
                    {
                        id: 'pagoRecibido',
                        title: 'Pagos Recibidos',
                        type: 'item',
                        url: 'reporte/pagosRecibidos',
                        exactMatch: true,
                    
                    },
                    {
                        id: 'Facturacontarjeta',
                        title: 'Facturas con Tarjetas',
                        type: 'item',
                        url: 'reporte/FacturasXTarjetas',
                        exactMatch: true,
                    
                    },
                    {
                        id: 'gastos',
                        title: 'Reporte Gastos',
                        type: 'item',
                        url: 'reporte/gastos',
                        exactMatch: true,
                    
                    }
                ],
                
            },
            {
                id: 'REPORTES',
                title: 'Inventario',
                translate: 'NAV.REPORTES',
                type: 'collapsable',
                icon: 'category',
                children: [    {
                    id: 'EstadisticoArticulo',
                    title: 'Estadistico de articulo',
                    type: 'item',
                    url: 'reporte/articulosVendidos',
                    exactMatch: true,
                
                },]

            },
            
            {
                id: 'REPORTES',
                title: 'Socios de Negocios',
                translate: 'NAV.REPORTES',
                type: 'collapsable',
                icon: 'assignment_ind',
                children: [    {
                    id: 'Comprascliente',
                    title: 'Informacion Socios',
                    type: 'item',
                    url: 'reporte/datosSocios',
                    exactMatch: true,
                
                },]

            }
        
        ]
        },


    {
        id: 'CRM',
        title: 'plataforma CRM',
        translate: 'NAV.CRM',
        type: 'group',
        icon: 'person_outline',
        children: [
            {
                id: 'CRM',
                title: 'CRM',
                translate: 'NAV.CRM',
                type: 'collapsable',
                icon: 'person_outline',
                children: [
                    // {

                    //     id        : 'historial',
                    //     title     : 'Historial',
                    //     type      : 'item',
                    //     url       : '/configuracion/historials',
                    //     exactMatch: true

                    // },
                    {
                        id: 'expedientes',
                        title: 'Expedientes',
                        type: 'item',
                        url: '/configuracion/expedientes',
                        exactMatch: true,
                    },

                    // {
                    //     id: 'citas',
                    //     title: 'Citas',
                    //     type: 'item',
                    //     url: '/configuracion/citas',
                    //     exactMatch: true,
                    // },
                ],
            },
        ],
    },
];
