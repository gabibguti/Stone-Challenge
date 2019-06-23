import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {AppService} from './app.service';
import {
  MatButtonModule,
  MatTableModule,
  MatCardModule,
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule, MatPaginatorModule, MatSelectModule, MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogMessageComponent} from '../dialog-message/dialog-message.component';
import {CommonModule} from '@angular/common';
import {DialogEditComponent} from '../dialog-edit/dialog-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogMessageComponent,
    DialogEditComponent
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    CommonModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
  entryComponents: [DialogMessageComponent, DialogEditComponent]
})

export class AppModule { }
