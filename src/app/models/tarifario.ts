export interface tarifario {
  id: number;
  idCliente: number | null;
  nombre: string;
  ubigeoOrigen: string;
  ubigeoDestino: string;
  tarifa: number | null;
  servicioErp: number | null;
}
