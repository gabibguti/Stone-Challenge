import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Funcionario, IFuncionario} from './funcionario';
import {AppService} from './app.service';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {DialogMessageComponent} from '../dialog-message/dialog-message.component';
import {DialogEditComponent} from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  // Tabela de funcionarios
  displayedColumns: string[] = ['id', 'nome', 'idade', 'cargo', 'actions'];
  dataSource = new MatTableDataSource();
  funcionarios: IFuncionario[];

  // Tabs
  selectedTab: number = 0;

  // Configuracoes e Pesquisa
  ConfigMode: boolean = false;
  SearchMode: boolean = false;
  filter_id = new FormControl();
  filter_nome = new FormControl();
  filter_idade = new FormControl();
  filter_cargo = new FormControl();
  filteredValues = {id: '', nome: '', idade: '', cargo: ''};

  // Registrar Funcionarios
  field_idade = new FormControl('', [Validators.min(0), Validators.max(120)]);
  field_nome = new FormControl('');
  field_cargo = new FormControl('');

  // Paginacao
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor (private service: AppService, private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    // Inicializar tabela
    this.AtualizarListaFuncionarios();

    // Inicializar filtros de pesquisa
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
    // Inicializar paginacao
    this.dataSource.paginator = this.paginator;
  }

  AtualizarListaFuncionarios() {
    // Pegar funcionarios na base de dados
    this.service.getFuncionarios().subscribe(
      data => {
        // Atualizar dados tabela
        this.funcionarios = data;
        this.dataSource =  new MatTableDataSource(this.funcionarios);
        // Resetar filtros e paginacao da tabela
        this.dataSource.filterPredicate = this.customFilterPredicate();
        this.dataSource.paginator = this.paginator;
        // Mudar tab atual para tabela
        this.ChangeTab(0);
      },
      (error: HttpResponse<any>) => {
        if (error.status === 504) {
          this.openMessageDialog('Base de dados fora do ar.');
        }
      });
  }

  AdicionarFuncionario(novo: IFuncionario) {
    // Adicionar funcionario a base de dados
    this.service.addFuncionario(novo).subscribe(
      data => {
        // Atualizar dados tabela
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
    // Deletar funcionario na base de dados
    this.service.deleteFuncionario(id).subscribe(data => {
      // Atualizar dados da tabela
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
    // Mudar dados de um funcionario na base de dados
    this.service.updateFuncionario(
      funcionario.id,
      funcionario.nome,
      funcionario.cargo,
      funcionario.idade)
      .subscribe(data => {
        // Atualizar dados da tabela
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
    // Criar funcionario com dados do registro
    const novoFuncionario = Funcionario.create(
      this.field_nome.value,
      this.field_cargo.value,
      this.field_idade.value
    );

    // Adicionar novo funcionario
    this.AdicionarFuncionario(novoFuncionario);
  }

  ChangeTab(index: number) {
    // Mudar tab pelo index
    this.selectedTab = index;
    if (this.selectedTab > 1) {
      this.selectedTab = 1;
    }
  }

  // Abrir notificacao para editar dados de um funcionario
  openEditionDialog(funcionario: IFuncionario) {
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

  // Abrir notificacao para mostrar aviso
  openMessageDialog(msg: string) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: msg
    });
  }

  // Ativar/desativar modo de configuracao de funcionarios
  ToggleConfigMode() {
    this.ConfigMode = !this.ConfigMode;
  }

  // Ativar/desativar modo de pesquisa de funcionarios
  ToggleSearchMode() {
    this.SearchMode = !this.SearchMode;
  }

  // Filtro da tabela para pesquisa
  customFilterPredicate() {
    // Para cada funcionario
    const myFilterPredicate = (data: IFuncionario): boolean => {
      // Verificar se encaixa nos filtros da pesquisa
      const hasId = data.id.toString().trim().toLowerCase().indexOf(this.filteredValues.id.toLocaleLowerCase()) !== -1;
      const hasNome = data.nome.toString().trim().toLowerCase().indexOf(this.filteredValues.nome.toLowerCase()) !== -1;
      const hasCargo = data.cargo.toString().trim().toLowerCase().indexOf(this.filteredValues.cargo.toLowerCase()) !== -1;
      const hasIdade = data.idade.toString().trim().indexOf(this.filteredValues.idade.toString()) !== -1;

      // Se encaixar em todos os filtros, entao mostrar funcionario nos resultados da pesquisa
      return hasId && hasNome && hasCargo && hasIdade;
    }
    return myFilterPredicate;
  }
}
