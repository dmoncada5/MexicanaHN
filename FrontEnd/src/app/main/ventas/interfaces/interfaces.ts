import { DateFilterFn } from '@angular/material/datepicker';
import { FuseUtils } from '@fuse/utils';
export interface cotizacionEncabezado {
  DocNum?: number;
  fechaDoc?: Date;	
  SocioCode?: string;
  NombreSocio?:	string;
  Direccion?: string;
  impuesto?: number;
  tasa?: number;
  TotalDoc?: number;
  DescPorcentaje?: number;
  Moneda?: string;
  comentarios?: string;
  vendedor?: number;
  LastUpdate?: string;	
  UserCreate?: string;
  Serie?: string;
  ccomp?: string;
  cai?: string;
  fact_emini?: string;
  fact_emifin?: string;
  correo?: string;
  fecha_limite?: string;
  numero?: string;
  tipo?: string;
  RTN?: string;
  status?: string;
}

export interface cotizacionDetalle
 {
    DocNum?: number;
    Linea?: number;
    itemCode?: string;
    itemName?: string;
    cantidad?: number;
    precio?: number;
    DescuentoLine?: number;
    impuestocod?: number;
    totaLine?: number;
    almacen?: number;
  }
export interface facturaEncabezado {
    DocNum?: number;
    fechaDoc?: Date;	
    SocioCode?: string;
    NombreSocio?:	string;
    Direccion?: string;
    impuesto?: number;
    tasa?: number;
    TotalDoc?: number;
    DescPorcentaje?: number;
    Moneda?: string;
    comentarios?: string;
    vendedor?: number;
    LastUpdate?: string;	
    UserCreate?: string;
    Serie?: string;
    ccomp?: string;
    cai?: string;
    fact_emini?: string;
    fact_emifin?: string;
    correo?: string;
    fecha_limite?: string;
    numero?: string;
    tipo?: string;
    RTN?: string;
    status?: string;
BaseRef?:string;
BaseDocRef?:string;
  
  }
export interface facturaDetalle
 {
    DocNum?: number;
    Linea?: number;
    itemCode?: string;
    itemName?: string;
    cantidad?: number;
    precio?: number;
    DescuentoLine?: number;
    impuestocod?: number;
    totaLine?: number;
    almacen?: string;
  }

  export interface OrdenEncabezado {
    DocNum?: number;
    fechaDoc?: Date;	
    SocioCode?: string;
    NombreSocio?:	string;
    Direccion?: string;
    impuesto?: number;
    tasa?: number;
    TotalDoc?: number;
    DescPorcentaje?: number;
    Moneda?: string;
    comentarios?: string;
    vendedor?: number;
    LastUpdate?: string;	
    UserCreate?: string;
    Serie?: string;
    ccomp?: string;
    cai?: string;
    fact_emini?: string;
    fact_emifin?: string;
    correo?: string;
    fecha_limite?: string;
    numero?: string;
    tipo?: string;
    RTN?: string;
    status?: string;
    BaseRef?:string;
BaseDocRef?:string;
  
  }
export interface OrdenDetalle
 {
    DocNum?: number;
    Linea?: number;
    itemCode?: string;
    itemName?: string;
    cantidad?: number;
    precio?: number;
    DescuentoLine?: number;
    impuestocod?: number;
    totaLine?: number;
    almacen?: string;
  }


  export interface NCPEncabezado {
    DocNum?: number;
    fechaDoc?: Date;	
    SocioCode?: string;
    NombreSocio?:	string;
    Direccion?: string;
    impuesto?: number;
    tasa?: number;
    TotalDoc?: number;
    DescPorcentaje?: number;
    Moneda?: string;
    comentarios?: string;
    vendedor?: number;
    LastUpdate?: string;	
    UserCreate?: string;
    Serie?: string;
    ccomp?: string;
    cai?: string;
    fact_emini?: string;
    fact_emifin?: string;
    correo?: string;
    fecha_limite?: string;
    numero?: string;
    tipo?: string;
    RTN?: string;
    status?: string;
    BaseRef?:string;
BaseDocRef?:string;
  
  }
export interface NCPDetalle
 {
    DocNum?: number;
    Linea?: number;
    itemCode?: string;
    itemName?: string;
    cantidad?: number;
    precio?: number;
    DescuentoLine?: number;
    impuestocod?: number;
    totaLine?: number;
    almacen?: string;
  }

export interface promoEncabezado {
    ItemCode?: string;
    ItemName?: string;
    FechaCreacion?: Date;
    impuesto?: string;
    observaciones?: string;
    estado?: string;
    ccomp?: string;
    costo?:  number;
    tipo?:  string;
    DocNum?: string;

  }
  
export interface promoDetalle
 {
    DocNum?: string;
    Linea?: number;
    itemCode?: string;
    itemName?: string;
    cantidad?: number;
    cbod?: string;
  }

  export interface CEEncabezado {
  ItemCode: string;
  ItemName: string;	
  bodega: string;
  stock: string;
  minimo: string;
  maximo: string;
  comprometido: string;
  solicitado: string;
  }

  export interface entradaEncabezado {
    id?:string;
    DocNum?: number;
    fechaDoc?: Date;
    UserCreate?: string;
    comentarios?: string;
    LastUpdate?: string;
    Serie?: string;
    ccomp?: string;
    numero?: string;
    tipo?: string;
    status?:string;
    }

  export interface entradaDetalle
   {
      DocNum?: number;
      Linea?: number;
      itemCode?: string;
      itemName?: string;
      cantidad?: number;
      precio?: number;
      almacen?: string;
    }


    export interface salidaEncabezado {
      id?:string;
      DocNum?: number;
      fechaDoc?: Date;
      UserCreate?: string;
      comentarios?: string;
      LastUpdate?: string;
      Serie?: string;
      ccomp?: string;
      numero?: string;
      tipo?: string;
      status?:string;
      }
  
    export interface salidaDetalle
     {
        DocNum?: number;
        Linea?: number;
        itemCode?: string;
        itemName?: string;
        cantidad?: number;
        precio?: number;
        almacen?: string;
      }
  

  export interface pcompraEncabezado {
    DocNum?: number;
    fechaDoc?: Date;	
    SocioCode?: string;
    NombreSocio?:	string;
    Direccion?: string;
    impuesto?: number;
    tasa?: number;
    TotalDoc?: number;
    DescPorcentaje?: number;
    Moneda?: string;
    comentarios?: string;
    vendedor?: number;
    LastUpdate?: string;	
    UserCreate?: string;
    Serie?: string;
    ccomp?: string;
    cai?: string;
    fact_emini?: string;
    fact_emifin?: string;
    correo?: string;
    fecha_limite?: string;
    numero?: string;
    tipo?: string;
    RTN?: string;
    status?:string
    BaseRef?:string;
BaseDocRef?:string;
    }

  export interface pcompraDetalle
   {
      DocNum?: number;
      Linea?: number;
      itemCode?: string;
      itemName?: string;
      cantidad?: number;
      precio?: number;
      DescuentoLine?: number;
      impuestocod?: number;
      totaLine?: number;
      almacen?: string;
    }


  export interface pedidoEncabezado {
    DocNum?: number;
    fechaDoc?: Date;	
    SocioCode?: string;
    NombreSocio?:	string;
    Direccion?: string;
    impuesto?: number;
    tasa?: number;
    TotalDoc?: number;
    DescPorcentaje?: number;
    Moneda?: string;
    comentarios?: string;
    vendedor?: number;
    LastUpdate?: string;	
    UserCreate?: string;
    Serie?: string;
    ccomp?: string;
    cai?: string;
    fact_emini?: string;
    fact_emifin?: string;
    correo?: string;
    fecha_limite?: string;
    numero?: string;
    tipo?: string;
    RTN?: string;
    status?:string
    BaseRef?:string;
BaseDocRef?:string;
    }

  export interface pedidoDetalle
   {
      DocNum?: number;
      Linea?: number;
      itemCode?: string;
      itemName?: string;
      cantidad?: number;
      precio?: number;
      DescuentoLine?: number;
      impuestocod?: number;
      totaLine?: number;
      almacen?: string;
    }



export interface compraEncabezado {
  DocNum?: number;
  fechaDoc?: Date;	
  SocioCode?: string;
  NombreSocio?:	string;
  Direccion?: string;
  impuesto?: number;
  tasa?: number;
  TotalDoc?: number;
  DescPorcentaje?: number;
  Moneda?: string;
  comentarios?: string;
  vendedor?: number;
  LastUpdate?: string;	
  UserCreate?: string;
  Serie?: string;
  ccomp?: string;
  cai?: string;
  fact_emini?: string;
  fact_emifin?: string;
  correo?: string;
  fecha_limite?: string;
  numero?: string;
  tipo?: string;
  RTN?: string;
  status?: string;
  BaseRef?:string;
BaseDocRef?:string;
  }
export interface compraDetalle
 {
    DocNum?: number;
    Linea?: number;
    itemCode?: string;
    itemName?: string;
    cantidad?: number;
    precio?: number;
    DescuentoLine?: number;
    impuestocod?: number;
    totaLine?: number;
    almacen?: string;
  }

export interface pago
 {
  pagoId?: number; fechaPago?: Date;  tipoDocumento?: string; NDocumento?: string; totalPago?: number;status?:string;formaPago?:string
  }
export interface tarjeta
  {
    pagoId?: number; tarjetaNumber?: string; FechaV?: Date; Nombre?: string; identidad?: string; totalTarjeta?: number; nombreBancoT?: string; 
  }
export interface efectivo
   {
    pagoId?: number; totalEfectivo?: number; nombreBancoE?: string;
  }
export interface cheque
    {
      pagoId?: number; fecha?: Date; nombreBanco?: string; numeroCheque?: string; totalCheque?: number;
     }
export interface transferencia
     {
      pagoId?: number; NumeroTrans?: string; fecha?: Date; totaltrans?: number; nombreBancoTT?: string;
      }

export interface notacreditoEncabezado {
    DocNum?: number;
    fechaDoc?: Date;	
    SocioCode?: string;
    NombreSocio?:	string;
    Direccion?: string;
    impuesto?: number;
    tasa?: number;
    TotalDoc?: number;
    DescPorcentaje?: number;
    Moneda?: string;
    comentarios?: string;
    vendedor?: number;
    LastUpdate?: string;	
    UserCreate?: string;
    Serie?: string;
    ccomp?: string;
    cai?: string;
    fact_emini?: string;
    fact_emifin?: string;
    correo?: string;
    fecha_limite?: string;
    numero?: string;
    tipo?: string;
    RTN?: string;
BaseRef?:string;
BaseDocRef?:string;
  
  }
export interface notacreditoDetalle
 {
    DocNum?: number;
    Linea?: number;
    itemCode?: string;
    itemName?: string;
    cantidad?: number;
    precio?: number;
    DescuentoLine?: number;
    impuestocod?: number;
    totaLine?: number;
    almacen?: string;
  }

export class Order
  {
      id: string;
      reference: string;
      subtotal: string;
      tax: string;
      discount: string;
      total: string;
      date: string;
      customer: any;
      products: any[];
      status: any[];
      payment: any;
      shippingDetails: any[];
  
      /**
       * Constructor
       *
       * @param order
       */
      constructor(order?)
      {
          order = order || {};
          this.id = order.id || FuseUtils.generateGUID();
          this.reference = order.reference || FuseUtils.generateGUID();
          this.subtotal = order.subtotal || 0;
          this.tax = order.tax || 0;
          this.discount = order.discount || 0;
          this.total = order.total || 0;
          this.date = order.date || '';
          this.customer = order.customer || {};
          this.products = order.products || [];
          this.status = order.status || [];
          this.payment = order.payment || {};
          this.shippingDetails = order.shippingDetails || [];
      }
  }
  
