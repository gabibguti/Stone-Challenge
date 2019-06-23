import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatDialogModule, MatFormFieldModule
} from '@angular/material';
import {DialogEditComponent} from './dialog-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DialogEditComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [DialogEditComponent]
})

export class DialogEditModule { }
