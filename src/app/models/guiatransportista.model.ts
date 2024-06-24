export interface GuiaTransportista {
    id: number;
    serie: number;
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
}
