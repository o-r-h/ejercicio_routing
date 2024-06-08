export interface Vin {
  id: number;
  nroVin: string;
  idCliente: number | null;
  idConcesionario: number | null;
  direccion: string;
  fechaInicial: string | null;
  marca: string;
  modelo: string;
  color: string;
  tipoComprobante: string;
  serie: string;
  numeroDocumento: string;
  createdAt: string | null;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string;
  estado: number | null;
}
