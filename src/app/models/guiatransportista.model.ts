export interface GuiaTransportista {
    id: number;
    serie: string;
    numero: number;
    idEntidadCliente: number;
    idEntidadConcesionario: number;
    fecha: string;
    fechaTraslado: string;
    idUbigeoOrigen: number;
    idUbigeoDestino: number;
    direccionOrigen: string;
    direccionDestino: string;
    idChofer: number;
    idTransporteTractor: number;
    idTransporteCarreta: number;
    peso: string;
    rutaXml:string;
    rutaPdf: string,
    rutaCdr: string,
    estado: number;
}
