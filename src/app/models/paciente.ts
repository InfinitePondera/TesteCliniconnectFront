import {Endereco} from "./endereco";

export interface Paciente {
  id: number,
  nome: string,
  sexo: string,
  email: string,
  celular: string,
  cpf: string,
  dataNascimento: string,
  enderecos: Endereco[]
}
