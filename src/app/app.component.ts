import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Funcionario} from './funcionario';
import {AppService} from './app.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'idade', 'cargo'];
  dataSource: MatTableDataSource;
  title = 'StoneChallenge';
  funcionarios: Funcionario[];
  funcionarioSelecionado: Funcionario;

  constructor (private service: AppService, private http: HttpClient) {}

  ngOnInit() {
    this.dataSource =  new MatTableDataSource(this.funcionarios);
    this.AtualizarListaFuncionarios();
  }

  // Pegar lista de funcionarios da base de dados (DB)
  AtualizarListaFuncionarios() {
    this.service.getFuncionarios().subscribe(data => {
        this.funcionarios = data;
        this.dataSource =  new MatTableDataSource(this.funcionarios);
      });
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
