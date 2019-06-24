import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Funcionario, IFuncionario} from '../app/funcionario';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})

export class DialogEditComponent {
  // Controles da edicao do funcionario
  field_id = new FormControl({value: '0', disabled: true}, [Validators.required]);
  field_idade = new FormControl('', [Validators.min(0), Validators.max(120)]);
  field_nome = new FormControl('');
  field_cargo = new FormControl('');

  // "funcionarioEditado" é a variavel utilizada para receber e retornar as edicoes
  constructor(@Inject(MAT_DIALOG_DATA) public funcionarioEditado: IFuncionario) {
  }
}
