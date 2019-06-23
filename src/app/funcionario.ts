export interface IFuncionario {
  id: string;
  nome: string;
  cargo: string;
  idade: number;
}

export class Funcionario {
  static create(nome: string, cargo: string, idade: number) {
    return { id: '', nome: nome, cargo: cargo, idade: idade};
  }
}
