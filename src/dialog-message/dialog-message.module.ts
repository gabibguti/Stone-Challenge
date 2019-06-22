import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatDialogModule
} from '@angular/material';
import {DialogMessageComponent} from './dialog-message.component';

@NgModule({
  declarations: [
    DialogMessageComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [DialogMessageComponent]
})

export class DialogMessageModule { }
