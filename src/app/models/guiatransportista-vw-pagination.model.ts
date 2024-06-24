export interface GuiaTransportistaPaginacion {
  id: number;
  serie: number;
  numero: number;
  idEntidadCliente: number;
  razonSocial: string;
  idEntidadConcesionario: number;
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
}
