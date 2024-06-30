export interface GuiaTransportistaPaginacion {
  id: number;
  serie: string;
  numero: number;
  idEntidadCliente: number;
  razonSocialCliente: string;
  idEntidadConcesionario: number;
  razonSocialConcesionario: string;
  fecha: string;
  fechaTraslado: string;
  idUbigeoOrigen: number;
  ubigeoOrigen: string;
  idUbigeoDestino: number;
  ubigeoDestino: string;
  direccionOrigen: string;
  direccionDestino: string;
  idChofer: number;
  chofer: string;
  datosChofer: string;
  idTransporteTractor: number;
  transporteTractor: string;
  idTransporteCarreta: number;
  transporteCarreta: string;
  peso: string;
  rutaXml:string;
  rutaPdf: string,
  rutaCdr: string,
  estado: number;
  estadoDescripcion: string;
}
