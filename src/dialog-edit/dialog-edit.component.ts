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
  funcionarioEditado: IFuncionario;

  field_id = new FormControl('0', [Validators.required]);
  field_idade = new FormControl('', [Validators.min(0), Validators.max(120)]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: IFuncionario) {
    this.funcionarioEditado = data;
  }
}
