import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Funcionario, IFuncionario} from './funcionario';
import {AppService} from './app.service';
import {MatDialog, MatDialogRef, MatPaginator, MatTabGroup, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogMessageComponent} from '../dialog-message/dialog-message.component';
import {DialogEditComponent} from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'idade', 'cargo', 'actions'];
  dataSource;

  ConfigMode: boolean = false;

  funcionarios: IFuncionario[];
  funcionarioSelecionado: IFuncionario;

  field_idade = new FormControl('', [Validators.min(0), Validators.max(120)]);
  field_id = new FormControl('', [Validators.required]);
  field_nome = new FormControl('');
  field_cargo = new FormControl('');

  selectedTab: number = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor (private service: AppService, private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource =  new MatTableDataSource(this.funcionarios);
    this.AtualizarListaFuncionarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Pegar lista de funcionarios da base de dados (DB)
  AtualizarListaFuncionarios() {
    this.service.getFuncionarios().subscribe(
      data => {
        this.funcionarios = data;
        console.log('atualizar list', data);
        this.dataSource =  new MatTableDataSource(this.funcionarios);
        this.dataSource.paginator = this.paginator;
        this.ChangeTab(0);
      });
  }

  // Adicionar funcionario a base de dados e atualizar lista de funcionarios
  AdicionarFuncionario(novo: IFuncionario) {
    this.service.addFuncionario(novo).subscribe(
      data => {
      console.log('adicionar', data);
      this.AtualizarListaFuncionarios();
    },
      (error: HttpResponse<any>) => {
        if (error.status === 403) {
          this.openMessageDialog('Funcionário já existe.');
        }
    });
  }

  RemoverFuncionario(id: number) {
    this.service.deleteFuncionario(id).subscribe(data => {
      this.AtualizarListaFuncionarios();
    },
      (error: HttpResponse<any>) => {
      if (error.status === 404) {
        this.openMessageDialog('Funcionário não pode ser removido.');
      }
    });

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

  openEditionDialog(funcionario: Funcionario) {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      data: funcionario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMessageDialog(msg: string) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: msg
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ToggleConfigMode() {
    this.ConfigMode = !this.ConfigMode;
  }

  DeletarFuncionario(id: number) {
    console.log('element id', id);
    this.RemoverFuncionario(id);
  }

  OpenEditionMode(funcionario: Funcionario) {
    this.openEditionDialog(funcionario);
  }
}
