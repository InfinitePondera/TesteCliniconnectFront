import {PacienteEndereco} from "./paciente-endereco";

export interface Endereco {
  id: number,
  rua: string,
  numero: number,
  bairro: string,
  cidade: string,
  estado: string,
}
