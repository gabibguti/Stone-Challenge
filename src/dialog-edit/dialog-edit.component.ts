import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Funcionario} from '../app/funcionario';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
})

export class DialogEditComponent {
  funcionarioEditado: Funcionario;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Funcionario) {
    this.funcionarioEditado = data;
  }
}
