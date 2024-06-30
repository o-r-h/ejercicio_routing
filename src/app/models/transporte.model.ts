export interface Transporte {
  id: number;
  placa: string;
  registroMTC: string;
  fichaInscripcion: string;
  marca: string;
  tipo: string;
  // createdAt: string | null;
  // createdBy: string;
  // modifiedAt: string | null;
  // modifiedBy: string;
  estado: number | null;
}
