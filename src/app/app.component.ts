import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Funcionario, IFuncionario} from './funcionario';
import {AppService} from './app.service';
import {MatTabGroup, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'idade', 'cargo'];
  dataSource;

  funcionarios: IFuncionario[];
  funcionarioSelecionado: IFuncionario;

  field_idade = new FormControl('', [Validators.min(0), Validators.max(120)]);
  field_id = new FormControl('', [Validators.required]);
  field_nome = new FormControl('');
  field_cargo = new FormControl('');

  selectedTab: number = 0;

  constructor (private service: AppService, private http: HttpClient) {}

  ngOnInit() {
    this.dataSource =  new MatTableDataSource(this.funcionarios);
    this.AtualizarListaFuncionarios();
  }

  // Pegar lista de funcionarios da base de dados (DB)
  AtualizarListaFuncionarios() {
    this.service.getFuncionarios().subscribe(
      data => {
        this.funcionarios = data;
        console.log('atualizar list', data);
        this.dataSource =  new MatTableDataSource(this.funcionarios);
        this.ChangeTab(0);
      });
  }

  // Adicionar funcionario a base de dados e atualizar lista de funcionarios
  AdicionarFuncionario(novo: IFuncionario) {
    this.service.addFuncionario(novo).subscribe(data => {
      console.log('adicionar', data);
      this.AtualizarListaFuncionarios();
    },
      (error: HttpResponse) => {
        if (error.status == 403) {
          //Funcionario ja existe
        }
    });
  }

  RemoverFuncionario(id: number) {
    this.service.deleteFuncionario(id).subscribe(data => this.AtualizarListaFuncionarios());
  }

  AtualizarDadosFuncionario() {
    this.service.updateFuncionario(
      this.funcionarioSelecionado.id,
      this.funcionarioSelecionado.nome,
      this.funcionarioSelecionado.cargo,
      this.funcionarioSelecionado.idade)
      .subscribe(() => this.AtualizarListaFuncionarios());
  }

  RegistrarFuncionario() {
    const novoFuncionario = Funcionario.create(
      this.field_id.value,
      this.field_nome.value,
      this.field_cargo.value,
      this.field_idade.value
    );

    this.AdicionarFuncionario(novoFuncionario);
  }

  ChangeTab(index: number) {
    console.log("index", index, this.selectedTab);
    this.selectedTab = index;
    if (this.selectedTab > 1) {
      this.selectedTab = 1;
    }
  }
}
