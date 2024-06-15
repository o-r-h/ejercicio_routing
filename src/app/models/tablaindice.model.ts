export interface TablaIndice {
  id: number;
  modulo: string;
  campo: string;
  descripcion: string;
  valorString: string;
  valorDecimal: number | null;
  valorEntero: number | null;
  createdAt: string | null;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string;
  estado: number | null;
}
