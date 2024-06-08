export interface Entidad {
  id: number;
  razonSocial: string;
  idTipoDocumento: number | null;
  numeroDocumento: string;
  idTipoEntidad: number | null;
  createdAt: string | null;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string;
  estado: number | null;
}
