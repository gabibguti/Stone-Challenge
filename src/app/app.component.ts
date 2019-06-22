import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Funcionario} from './funcionario';
import {AppService} from './app.service';
import {MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  title = 'StoneChallenge';
  funcionarios: Funcionario[];
  funcionarioSelecionado: Funcionario;

  tableColumns: string[] = ['id', 'nome', 'idade', 'cargo'];

  constructor (private service: AppService, private http: HttpClient) {}

  ngOnInit() {
    this.AtualizarListaFuncionarios();
  }

  // Pegar lista de funcionarios da base de dados (DB)
  AtualizarListaFuncionarios() {
    console.log("GETTING THEM");
    this.service.getFuncionarios().subscribe(data => {
        this.funcionarios = data;
        console.log("THEM", data, this.funcionarios);
      });
  }

  test() {
    console.log("FUNCIOANRIOS", this.funcionarios);
  }

  // Adicionar funcionario a base de dados e atualizar lista de funcionarios
  AdicionarFuncionario(novo: Funcionario) {
    this.service.addFuncionario(novo).subscribe(() => this.AtualizarListaFuncionarios());
  }

  RemoverFuncionario(id: number) {
    this.service.deleteFuncionario(id).subscribe(() => this.AtualizarListaFuncionarios());
  }

  AtualizarDadosFuncionario() {
    this.service.updateFuncionario(
      this.funcionarioSelecionado.id,
      this.funcionarioSelecionado.nome,
      this.funcionarioSelecionado.cargo,
      this.funcionarioSelecionado.idade)
      .subscribe(() => this.AtualizarListaFuncionarios());
  }
}
