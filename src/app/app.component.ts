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
  SearchMode: boolean = false;

  funcionarios: IFuncionario[];
  funcionarioSelecionado: IFuncionario;

  field_idade = new FormControl('', [Validators.min(0), Validators.max(120)]);
  field_id = new FormControl('', [Validators.required]);
  field_nome = new FormControl('');
  field_cargo = new FormControl('');

  selectedTab: number = 0;

  filter_id = new FormControl();
  filter_nome = new FormControl();
  filter_idade = new FormControl();
  filter_cargo = new FormControl();

  filteredValues = {
    id: '', nome: '', idade: '', cargo: ''
  };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor (private service: AppService, private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource =  new MatTableDataSource(this.funcionarios);
    this.AtualizarListaFuncionarios();

    this.filter_id.valueChanges.subscribe((filterValue) => {
      this.filteredValues.id = filterValue;
      this.dataSource.filter = ' ';
    });

    this.filter_nome.valueChanges.subscribe((filterValue) => {
      this.filteredValues.nome = filterValue;
      this.dataSource.filter = ' ';
    });

    this.filter_cargo.valueChanges.subscribe((filterValue) => {
      this.filteredValues.cargo = filterValue;
      this.dataSource.filter = ' ';
    });

    this.filter_idade.valueChanges.subscribe((filterValue) => {
      this.filteredValues.idade = filterValue;
      this.dataSource.filter = ' ';
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Pegar lista de funcionarios da base de dados (DB)
  AtualizarListaFuncionarios() {
    this.service.getFuncionarios().subscribe(
      data => {
        this.funcionarios = data;
        this.dataSource =  new MatTableDataSource(this.funcionarios);
        this.dataSource.filterPredicate = this.customFilterPredicate();
        this.dataSource.paginator = this.paginator;
        this.ChangeTab(0);
      },
      (error: HttpResponse<any>) => {
        if (error.status === 504) {
          this.openMessageDialog('Base de dados fora do ar.');
        }
      });
  }

  // Adicionar funcionario a base de dados e atualizar lista de funcionarios
  AdicionarFuncionario(novo: IFuncionario) {
    this.service.addFuncionario(novo).subscribe(
      data => {
      this.AtualizarListaFuncionarios();
    },
      (error: HttpResponse<any>) => {
        if (error.status === 403) {
          this.openMessageDialog('Funcionário já existe.');
        } else if (error.status === 404) {
          this.openMessageDialog('Funcionário não pode ser adicionado.');
        } else if (error.status === 504) {
          this.openMessageDialog('Base de dados fora do ar.');
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
      } else if (error.status === 504) {
        this.openMessageDialog('Base de dados fora do ar.');
      }
    });

  }

  AtualizarDadosFuncionario(funcionario: IFuncionario) {
    this.service.updateFuncionario(
      funcionario.id,
      funcionario.nome,
      funcionario.cargo,
      funcionario.idade)
      .subscribe(data => {
        this.AtualizarListaFuncionarios();
      },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            this.openMessageDialog('Funcionário não pode ser atualizado.');
          } else if (error.status === 504) {
            this.openMessageDialog('Base de dados fora do ar.');
          }
        });
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
      // Salvar novos dados do funcionario
      if (result.status) {
        this.AtualizarDadosFuncionario(result.data);
      }
    });
  }

  openMessageDialog(msg: string) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: msg
    });
  }

  ToggleConfigMode() {
    this.ConfigMode = !this.ConfigMode;
  }

  ToggleSearchMode() {
    this.SearchMode = !this.SearchMode;
  }

  OpenEditionMode(funcionario: IFuncionario) {
    this.openEditionDialog(funcionario);
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: IFuncionario): boolean => {

      const hasId = data.id.toString().trim().toLowerCase().indexOf(this.filteredValues.id.toLocaleLowerCase()) !== -1;
      const hasNome = data.nome.toString().trim().toLowerCase().indexOf(this.filteredValues.nome.toLowerCase()) !== -1;
      const hasCargo = data.cargo.toString().trim().toLowerCase().indexOf(this.filteredValues.cargo.toLowerCase()) !== -1;
      const hasIdade = data.idade.toString().trim().indexOf(this.filteredValues.idade.toString()) !== -1;

      return hasId && hasNome && hasCargo && hasIdade;
    }
    return myFilterPredicate;
  }
}
