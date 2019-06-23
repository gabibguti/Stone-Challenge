import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatDialogModule
} from '@angular/material';
import {DialogEditComponent} from './dialog-edit.component';

@NgModule({
  declarations: [
    DialogEditComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [DialogEditComponent]
})

export class DialogEditModule { }
