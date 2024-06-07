export interface tablaindice {
  id: number;
  modulo: string;
  campo: string;
  valorString: string;
  valorDecimal: number | null;
  valorEntero: number | null;
  createdAt: string | null;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string;
  estado: number | null;
}
