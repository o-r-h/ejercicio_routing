export interface transporte {
  id: number;
  placa: string;
  registroMTC: string;
  fichaInscripcion: string;
  tipo: string;
  createdAt: string | null;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string;
  estado: number | null;
}
