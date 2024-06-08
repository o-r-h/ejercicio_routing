export interface Establecimiento {
  id: number;
  idEntidad: number | null;
  nombre: string;
  direccion: string;
  ubigeo: string;
  tipoEstablecimiento: string;
  createdAt: string | null;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string;
  estado: number | null;
}
