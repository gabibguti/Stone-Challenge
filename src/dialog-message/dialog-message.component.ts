import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
})

export class DialogMessageComponent {
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.message = data;
  }
}
