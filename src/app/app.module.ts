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

@NgModule({
  declarations: [
    AppComponent,
    DialogMessageComponent
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
  entryComponents: [DialogMessageComponent]
})

export class AppModule { }
