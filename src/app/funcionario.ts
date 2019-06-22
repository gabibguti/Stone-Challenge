export interface IFuncionario {
  id: string;
  nome: string;
  cargo: string;
  idade: number;
}

export class Funcionario {
  static create(id: string, nome: string, cargo: string, idade: number) {
    return { id: id, nome: nome, cargo: cargo, idade: idade};
  }
}
