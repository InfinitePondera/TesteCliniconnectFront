import {Endereco} from "./endereco";

export class Paciente {
  id: number = 0;
  nome: string = "";
  sexo: string = "";
  email: string = "";
  celular: string = "";
  cpf: string = "";
  dataNascimento: string = "";
  enderecos: Endereco[] = new Array<Endereco>();
  informacaoAtendimento: string = "";
}
